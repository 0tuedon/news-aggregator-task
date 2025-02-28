import { useCallback, useEffect, useMemo, useState } from "react";
import ArticleList from "../components/ArticleList";
import {
  useGetFromGuardianAPIQuery,
  useGetFromNewsAPIQuery,
  useGetFromNYTAPIQuery,
} from "../services";
import { News } from "../types";

import { debounce, structureNewsData } from "../utils";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { FiltersState } from "../store/filtersSlice";

const initialQuery: FiltersState = {
  keyword: "",
  category: "",
  source: "",
  dateFrom: "",
  dateTo: "",
};
const HomePage = () => {
  const filters = useSelector((state: RootState) => state.filters);

  const [currentQuery, setCurrentQuery] = useState<FiltersState>(initialQuery);
  const { data: newsAPIData, isLoading: loadingNewsAPI } =
    useGetFromNewsAPIQuery(currentQuery);
  const { data: guardianData, isLoading: loadingGuardian } =
    useGetFromGuardianAPIQuery(currentQuery);
  const { data: nytData, isLoading: loadingNYT } =
    useGetFromNYTAPIQuery(currentQuery);

  const debouncedQueryUpdate = useCallback(
    debounce((newQuery: FiltersState) => {
      setCurrentQuery(newQuery);
    }, 1000),
    []
  );

  useEffect(() => {
    debouncedQueryUpdate(filters);
  }, [filters, debouncedQueryUpdate]);
  
  // Memoize the combined news data to avoid unnecessary re-renders
  const allNews: News[] = useMemo(() => {
    const newsFromAPI = newsAPIData ? structureNewsData(newsAPIData) : [];
    const newsFromGuardian = guardianData
      ? structureNewsData(guardianData)
      : [];
    const newsFromNYT = nytData ? structureNewsData(nytData) : [];

    return [...newsFromAPI, ...newsFromGuardian, ...newsFromNYT];
  }, [newsAPIData, guardianData, nytData]);

  useEffect(() => {
    debounce(() => {
      setCurrentQuery(filters);
    }, 1000);

    return () => {
      setCurrentQuery(initialQuery);
    };
  }, [filters]);

  if (loadingNewsAPI || loadingGuardian || loadingNYT) return <p>Loading...</p>;

  return (
    <div>
      <ArticleList allNews={allNews} />
    </div>
  );
};

export default HomePage;
