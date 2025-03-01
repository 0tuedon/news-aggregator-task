import { useCallback, useEffect, useMemo, useState } from "react";
import ArticleList from "../components/ArticleList";
import {
  NewsQuery,
  useGetFromGuardianAPIQuery,
  useGetFromNewsAPIQuery,
  useGetFromNYTAPIQuery,
} from "../services";
import { News } from "../types";

import { debounce, structureNewsData } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { FiltersState, setPersonalized } from "../store/filtersSlice";
import { initialPreferenceState } from "../store/userPreferenceSlice";

const initialQuery: NewsQuery = {
  query: {
    keyword: "",
    category: "",
    sources: ["newsAPI", "guardian", "nyt"],
    dateFrom: "",
    dateTo: "",
  },
  userPreferences: initialPreferenceState,
};

const HomePage = ({ isPersonalized }: { isPersonalized?: boolean }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  const userPreferences = useSelector((state: RootState) => state.userPreferences); // Use selector to get user preferences directly
  const [currentQuery, setCurrentQuery] = useState<NewsQuery>({ ...initialQuery });

  const { data: newsAPIData, isLoading: loadingNewsAPI } = useGetFromNewsAPIQuery(currentQuery);
  const { data: guardianData, isLoading: loadingGuardian } = useGetFromGuardianAPIQuery(currentQuery);
  const { data: nytData, isLoading: loadingNYT } = useGetFromNYTAPIQuery(currentQuery);

  // Debounced query update
  const debouncedQueryUpdate = useCallback(
    debounce((newQuery: FiltersState) => {
      setCurrentQuery({ query: newQuery, userPreferences });
    }, 1000),
    [userPreferences]
  );

  // Update current query whenever filters change
  useEffect(() => {
    debouncedQueryUpdate(filters);
  }, [filters, debouncedQueryUpdate]);

  // helper function for condition check
  const isForYouPage = typeof window !== "undefined" && window.location.pathname ===
    "/for-you";

  const isUserOrFilteredSources = useCallback((type: string) => {
    if (isForYouPage && userPreferences.sources.length) {

      return userPreferences.sources.includes(type);
    } else {
      return filters.sources.includes(type);
    }
  }, [isForYouPage, userPreferences.sources, filters.sources]);

  // Combine all news data
  const allNews: News[] = useMemo(() => {

    const newsFromAPI = isUserOrFilteredSources("newsAPI") && newsAPIData ? structureNewsData(newsAPIData) : [];
    const newsFromGuardian = isUserOrFilteredSources("guardian") && guardianData ? structureNewsData(guardianData) : [];
    const newsFromNYT = isUserOrFilteredSources("nyt") && nytData ? structureNewsData(nytData) : [];

    return [...newsFromAPI, ...newsFromGuardian, ...newsFromNYT];
  }, [newsAPIData, guardianData, nytData, isUserOrFilteredSources]);

  // Set personalized filters
  useEffect(() => {
    if (isPersonalized) {
      dispatch(setPersonalized(true));
    } else {
      dispatch(setPersonalized(false));
    }
  }, [isPersonalized, dispatch]);

  if (loadingNewsAPI || loadingGuardian || loadingNYT) return <p>Loading...</p>;

  return (
    <div>
      <ArticleList allNews={allNews} />
    </div>
  );
};

export default HomePage;
