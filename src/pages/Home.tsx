import "./Home.sass";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  useGetFromGuardianAPIQuery,
  useGetFromNewsAPIQuery,
  useGetFromNYTAPIQuery,
} from "../services";
import { FiltersState, setPersonalized } from "../store/filtersSlice";
import { debounce, structureNewsData } from "../utils";
import ArticleList from "../components/ArticleList";
import Loader from "../components/Loader";
import FilterDrawer from "../components/drawer/FilterDrawer";
import Wrapper from "../components/drawer/Wrapper";
import { TiFilter } from "react-icons/ti";

const HomePage = ({ isPersonalized }: { isPersonalized?: boolean }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  const userPreferences = useSelector(
    (state: RootState) => state.userPreferences
  );

  const [currentQuery, setCurrentQuery] = useState({
    query: filters,
    userPreferences,
  });

  const [debouncedKeyword, setDebouncedKeyword] = useState(filters.keyword);
  const [isFetching, setIsFetching] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOnClick = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Debounce only keyword updates
  const debounceKeywordUpdate = useCallback(
    debounce((newKeyword: string) => {
      setDebouncedKeyword(newKeyword);
    }, 500),
    []
  );

  useEffect(() => {
    debounceKeywordUpdate(filters.keyword);
  }, [filters.keyword, debounceKeywordUpdate]);

  // Update currentQuery when filters change
  useEffect(() => {
    setIsFetching(true); // Show loader immediately
    setCurrentQuery({
      query: { ...filters, keyword: debouncedKeyword },
      userPreferences,
    });
  }, [
    filters.category,
    filters.sources,
    filters.dateFrom,
    filters.dateTo,
    debouncedKeyword,
    userPreferences,
  ]);

  const { data: newsAPIData, isFetching: fetchingNewsAPI } =
    useGetFromNewsAPIQuery(currentQuery);
  const { data: guardianData, isFetching: fetchingGuardian } =
    useGetFromGuardianAPIQuery(currentQuery);
  const { data: nytData, isFetching: fetchingNYT } =
    useGetFromNYTAPIQuery(currentQuery);

  useEffect(() => {
    if (!fetchingNewsAPI && !fetchingGuardian && !fetchingNYT) {
      setIsFetching(false); // Hide loader when all requests complete
    }
  }, [fetchingNewsAPI, fetchingGuardian, fetchingNYT]);

  // Combine all news data
  const allNews = useMemo(() => {
    return [
      ...(newsAPIData ? structureNewsData(newsAPIData) : []),
      ...(guardianData ? structureNewsData(guardianData) : []),
      ...(nytData ? structureNewsData(nytData) : []),
    ].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [newsAPIData, guardianData, nytData]);

  useEffect(() => {
    dispatch(setPersonalized(!!isPersonalized));
  }, [isPersonalized, dispatch]);

  return (
    <>
      <div className="news">
        <div className="news-header">
          <h2 className="news-header__title">
            {isPersonalized ? "Your Feeds" : "Latest News"}
          </h2>
          <button className="news-header__customize" onClick={handleDrawerOnClick}>
            <TiFilter />
            <span>Filters</span>
          </button>
        </div>
        {isFetching ? <Loader /> : <ArticleList allNews={allNews} />}
      </div>

      <Wrapper drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}>
        <FilterDrawer />
      </Wrapper>
    </>
  );
};

export default HomePage;
