import { GuardianType, NewsAPIType, NYTAPIType } from "../types";
import { News } from "../types/news";

export function structureNewsData(news: NewsAPIType | GuardianType | NYTAPIType): News[] {
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
      imgLink: article.urlToImage || "/images/default-news.jpg",
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
        : "",
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
      imgLink: "",
    }));
  }

  return [];
}
