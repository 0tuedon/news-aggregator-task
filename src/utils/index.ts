import { FiltersState } from "../store/filtersSlice";
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

const NEWS_API = process.env.REACT_APP_NEWS_API;
const NEWS_API_BASE_URL = `https://newsapi.org/v2/`;

const GUARDIAN_API = process.env.REACT_APP_GUARDIAN_API;
const GUARDIAN_BASE_URL = `https://content.guardianapis.com/`;

const NYT_API = process.env.REACT_APP_NYT_API;
const NYT_BASE_URL = `https://api.nytimes.com/svc/search/v2/`;

export const buildAPIQuery = (
  query: FiltersState,
  source: "newsAPI" | "guardian" | "nyt"
): string => {
  let baseURL = "";
  let apiKey = "";
  let url = "";

  // Get the mapped category
  const mappedCategory = query.category
    ? categoryMapping[query.category as keyof typeof categoryMapping]?.[source]
    : null;

  switch (source) {
    case "newsAPI":
      baseURL = NEWS_API_BASE_URL;
      apiKey = `apiKey=${NEWS_API}`;
      url = `${baseURL}top-headlines?country=us&${apiKey}`;

      if (query.dateFrom) url += `&from=${query.dateFrom}`;
      if (query.dateTo) url += `&to=${query.dateTo}`;

      if (query.category === "") url += ``;
      if (mappedCategory) url += `&category=${mappedCategory}`;

      if (query.keyword) {
        url = `${baseURL}everything?q=${encodeURIComponent(
          query.keyword
        )}&${apiKey}`;
        
        if (query.dateFrom) url += `&from=${query.dateFrom}`;
        if (query.dateTo) url += `&to=${query.dateTo}`;
      }
      break;

    case "guardian":
      baseURL = GUARDIAN_BASE_URL;
      apiKey = `api-key=${GUARDIAN_API}`;
      url = `${baseURL}search?${apiKey}`;

      if (query.keyword) url += `&q=${encodeURIComponent(query.keyword)}`;
      if (query.dateFrom) url += `&from-date=${query.dateFrom}`;
      if (query.dateTo) url += `&to-date=${query.dateTo}`;
      if (query.category === "") url += ``;
      if (mappedCategory)
        url += `&section=${encodeURIComponent(mappedCategory)}`;
      break;

    case "nyt":
      baseURL = NYT_BASE_URL;
      apiKey = `api-key=${NYT_API}`;
      url = `${baseURL}articlesearch.json?${apiKey}`;

      if (query.keyword) url += `&q=${encodeURIComponent(query.keyword)}`;
      if (query.dateFrom)
        url += `&begin_date=${query.dateFrom.replace(/-/g, "")}`;
      if (query.dateTo) url += `&end_date=${query.dateTo.replace(/-/g, "")}`;
      if (query.category === "") url += ``;

      if (mappedCategory)
        url += `&fq=section_name:(${encodeURIComponent(mappedCategory)})`;
      break;
  }

  return url;
};
