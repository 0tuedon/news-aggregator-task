import configs from "../config";
import { FiltersState } from "../store/filtersSlice";
import { UserPreferencesState } from "../store/userPreferenceSlice";
import { GuardianType, NewsAPIType, NYTAPIType } from "../types";
import { News } from "../types/news";
import { categoryMapping } from "./data";

export function structureNewsData(
  news: NewsAPIType | GuardianType | NYTAPIType
): News[] {
  const defaultImage = "/images/default-news.jpg";
  // News API
  if ("articles" in news) {
    return news.articles.map((article) => ({
      title: article.title,
      description: article.description || "No description available",
      source: article.source.name,
      publishedAt: new Date(article.publishedAt),
      url: article.url,
      author: article.author || "Unknown",
      category: "General",
      imgLink: article.urlToImage || defaultImage,
    }));
    //  New York Times API
  } else if ("copyright" in news) {
    return news.response.docs.map((article) => ({
      title: article.headline.main,
      description: article.abstract || "No description available",
      source: "New York Times",
      publishedAt: new Date(article.pub_date),
      url: article.web_url,
      author: article.byline?.original || "Unknown",
      category: article.section_name || "General",
      imgLink: article.multimedia?.length
        ? `https://www.nytimes.com/${article.multimedia[0].url}`
        : defaultImage,
    }));
    // The Guardian API
  } else if ("response" in news && "results" in news.response) {
    return news.response.results.map((article) => ({
      title: article.webTitle,
      description: "No description available",
      source: "The Guardian",
      publishedAt: new Date(article.webPublicationDate),
      url: article.webUrl,
      author: "Unknown", // The Guardian API does not provide author information in this response
      category: article.sectionName || "General",
      imgLink: defaultImage,
    }));
  }

  return [];
}

//  Debounce function
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const NEWS_API = configs.NEWS_API;
const NEWS_API_BASE_URL = `https://newsapi.org/v2/`;

const GUARDIAN_API = configs.GUARDIAN_API;
const GUARDIAN_BASE_URL = `https://content.guardianapis.com/`;

const NYT_API = configs.NYT_API;
const NYT_BASE_URL = `https://api.nytimes.com/svc/search/v2/`;

export const buildAPIQuery = (
  query: FiltersState,
  source: "newsAPI" | "guardian" | "nyt",
  userPreferences: UserPreferencesState
): string => {
  let baseURL = "";
  let apiKey = "";
  let url = "";

  const isForYouPage = typeof window !== "undefined" && window.location.pathname === "/for-you";

  // Build mapped category from query
  const mappedCategory = query.category
    ? categoryMapping[query.category as keyof typeof categoryMapping]?.[source]
    : null;

  switch (source) {
    case "newsAPI":
      baseURL = NEWS_API_BASE_URL;
      apiKey = `apiKey=${NEWS_API}`;
      url = `${baseURL}top-headlines?country=us&${apiKey}`;

      if (query.keyword) url += `&q=${encodeURIComponent(query.keyword)}`;
      if (query.dateFrom) url += `&from=${query.dateFrom}`;
      if (query.dateTo) url += `&to=${query.dateTo}`;
      if (mappedCategory) url += `&category=${mappedCategory}`;

      // Apply user preferences if on "/for-you" page
      if (isForYouPage) {
        if (userPreferences.authors.length) {
          url += `&authors=${userPreferences.authors.map(encodeURIComponent).join(",")}`;
        }
        if (userPreferences.categories.length) {
          url += `&category=${userPreferences.categories.map(encodeURIComponent).join(",")}`;
        }
      }
      break;

    case "guardian":
      baseURL = GUARDIAN_BASE_URL;
      apiKey = `api-key=${GUARDIAN_API}`;
      url = `${baseURL}search?${apiKey}`;

      // Combine keyword and authors for Guardian (if on "/for-you" page)
      if (isForYouPage) {
        let authorsQuery = "";
        if (userPreferences.authors.length) {
          authorsQuery = userPreferences.authors.map(encodeURIComponent).join(" OR ");
        }

        if (query.keyword && authorsQuery) {
          url += `&q=${encodeURIComponent(query.keyword)} AND ${authorsQuery}`;
        } else if (query.keyword) {
          url += `&q=${encodeURIComponent(query.keyword)}`;
        } else if (authorsQuery) {
          url += `&q=${authorsQuery}`;
        }
      }

      // Add date range
      if (query.dateFrom) url += `&from-date=${query.dateFrom}`;
      if (query.dateTo) url += `&to-date=${query.dateTo}`;

      
      if (isForYouPage && userPreferences.categories.length) {
        url += `&section=${userPreferences.categories.map(encodeURIComponent).join(",")}`;
      }
      break;

    case "nyt":
      baseURL = NYT_BASE_URL;
      apiKey = `api-key=${NYT_API}`;
      url = `${baseURL}articlesearch.json?${apiKey}`;

      if (query.keyword) url += `&q=${encodeURIComponent(query.keyword)}`;
      if (query.dateFrom) url += `&begin_date=${query.dateFrom.replace(/-/g, "")}`;
      if (query.dateTo) url += `&end_date=${query.dateTo.replace(/-/g, "")}`;

      // Apply user preferences if on "/for-you" page
      if (isForYouPage) {
        if (userPreferences.authors.length) {
          url += `&fq=byline:(${userPreferences.authors.map(encodeURIComponent).join(",")})`;
        }
        if (userPreferences.categories.length) {
          url += `&fq=section_name:(${userPreferences.categories.map(encodeURIComponent).join(",")})`;
        }
      }
      break;
  }

  return url;
};

