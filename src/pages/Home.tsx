import { useMemo } from "react";
import ArticleList from "../components/ArticleList";
import {
  useGetFromGuardianAPIQuery,
  useGetFromNewsAPIQuery,
  useGetFromNYTAPIQuery,
} from "../services";
import { News } from "../types";

import { structureNewsData } from "../utils";

const HomePage = () => {
  const { data: newsAPIData, isLoading: loadingNewsAPI } =
    useGetFromNewsAPIQuery("bitcoin");
  const { data: guardianData, isLoading: loadingGuardian } =
    useGetFromGuardianAPIQuery("bitcoin");
  const { data: nytData, isLoading: loadingNYT } =
    useGetFromNYTAPIQuery("bitcoin");

  // Memoize the combined news data to avoid unnecessary re-renders
  const allNews: News[] = useMemo(() => {
    const newsFromAPI = newsAPIData ? structureNewsData(newsAPIData) : [];
    const newsFromGuardian = guardianData
      ? structureNewsData(guardianData)
      : [];
    const newsFromNYT = nytData ? structureNewsData(nytData) : [];

    return [...newsFromAPI, ...newsFromGuardian, ...newsFromNYT];
  }, [newsAPIData, guardianData, nytData]);

  if (loadingNewsAPI || loadingGuardian || loadingNYT) return <p>Loading...</p>;
  return (
    <div>
      <ArticleList allNews={allNews} />
    </div>
  );
};

export default HomePage;
