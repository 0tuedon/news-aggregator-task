import "./Home.sass";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  useGetFromGuardianAPIQuery,
  useGetFromNewsAPIQuery,
  useGetFromNYTAPIQuery,
} from "../services";
import { setPersonalized } from "../store/filtersSlice";
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
  const [page, setPage] = useState(1);
  const [allNews, setAllNews] = useState<any[]>([]);

  const handleDrawerOnClick = () => {
    setDrawerOpen(!drawerOpen);
  };

  const debounceKeywordUpdate = debounce((newKeyword: string) => {
    setDebouncedKeyword(newKeyword);
  }, 500);

  useEffect(() => {
    debounceKeywordUpdate(filters.keyword);
  }, [filters.keyword]);

  useEffect(() => {
    setIsFetching(true);
    setCurrentQuery({
      query: { ...filters, keyword: debouncedKeyword },
      userPreferences,
    });
    setPage(1); // Reset pagination when filters change
  }, [
    filters.category,
    filters.sources,
    filters.dateFrom,
    filters.dateTo,
    debouncedKeyword,
    userPreferences,
  ]);

  const { data: newsAPIData, isFetching: fetchingNewsAPI } =
    useGetFromNewsAPIQuery({ ...currentQuery, page });
  const { data: guardianData, isFetching: fetchingGuardian } =
    useGetFromGuardianAPIQuery({ ...currentQuery, page });
  const { data: nytData, isFetching: fetchingNYT } =
    useGetFromNYTAPIQuery({ ...currentQuery, page });

  const isForYouPage =
    typeof window !== "undefined" && window.location.pathname === "/for-you";

  useEffect(() => {
    if (!fetchingNewsAPI && !fetchingGuardian && !fetchingNYT) {
      setIsFetching(false);
    }
  }, [fetchingNewsAPI, fetchingGuardian, fetchingNYT]);

  // This useEffect will update the allNews state with fetched data
  useEffect(() => {
    const isSourceAllowed = (type: string) => {
      if (isForYouPage && userPreferences.sources.length) {
        return userPreferences.sources.includes(type);
      } else {
        return filters.sources.includes(type);
      }
    };

    const newsFromAPI =
      isSourceAllowed("newsAPI") && newsAPIData
        ? structureNewsData(newsAPIData)
        : [];
    const newsFromGuardian =
      isSourceAllowed("guardian") && guardianData
        ? structureNewsData(guardianData)
        : [];
    const newsFromNYT =
      isSourceAllowed("nyt") && nytData
        ? structureNewsData(nytData)
        : [];

    const newNews = [...newsFromAPI, ...newsFromGuardian, ...newsFromNYT].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    if (page === 1) {
      setAllNews(newNews); // Reset news when filters change or page is 1
    } else {
      setAllNews((prev) => [...prev, ...newNews]); // Append new news on subsequent pages
    }
  }, [
    newsAPIData,
    guardianData,
    nytData,
    filters.sources,
    userPreferences.sources,
    isForYouPage,
    page,
  ]);

  useEffect(() => {
    dispatch(setPersonalized(!!isPersonalized));
  }, [isPersonalized, dispatch]);

  const loadMore = () => {
    setPage((prev) => prev + 1); // Increment page number for fetching next page
  };

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
        {isFetching && page === 1 ? <Loader /> : <ArticleList allNews={allNews} />}
        {!isFetching && (<div className="load-more">
          <button className="load-more__button" onClick={loadMore} disabled={isFetching}>
              Load More
          </button>
        </div>)}
       
      </div>

      <Wrapper drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}>
        <FilterDrawer />
      </Wrapper>
    </>
  );
};

export default HomePage;
