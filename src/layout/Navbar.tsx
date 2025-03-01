// Styles
import "./Navbar.sass";
// Packages
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import DatePicker from "react-datepicker";
//  Local Imports
import { RootState } from "../store";
import {
  setCategory,
  setDateFrom,
  setDateTo,
  setKeyword,
  setSources,
} from "../store/filtersSlice";
import FilterMenuIcon from "../components/icons/FilterMenuIcon";
import { formatDate } from "date-fns";
import { allSources, categoryMapping } from "../utils/data";
import UserPreference from "./UserPreference";

const Navbar = () => {
  const dispatch = useDispatch();
  const keyword = useSelector((state: RootState) => state.filters.keyword);
  const dateFrom = useSelector((state: RootState) => state.filters.dateFrom);
  const dateTo = useSelector((state: RootState) => state.filters.dateTo);
  const category = useSelector((state: RootState) => state.filters.category);
  const sources = useSelector((state: RootState) => state.filters.sources);
  // Local States
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    dispatch(setKeyword(e.target.value));
  };

  const handleDrawerOnClick = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDateChange = (date: Date | null, range: "start" | "end") => {
    let formattedDate = formatDate(date || new Date(), "yyyy-MM-dd");
    if (range === "end") {
      dispatch(setDateTo(formattedDate));
      return;
    }
    dispatch(setDateFrom(formattedDate));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCategory(e.target.value));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(sources.includes(e.target.value)){
      dispatch(setSources(sources.filter((source) => source !== e.target.value)));
      return;
    }
    dispatch(setSources([...sources, e.target.value]));
  };
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <h1>News App</h1>
          </div>
          <div className="navbar-container__links">
            <a href="/">Home</a>
            <a href="/about">About</a>
          </div>
          <div className="navbar-container-right">
            <div className="navbar-container__search">
              <input
                type="text"
                value={keyword}
                placeholder="Search"
                onChange={handleSearch}
              />
            </div>

            <FilterMenuIcon
              onClick={handleDrawerOnClick}
              className="navbar-container__filter"
            />
          </div>
        </div>
      </nav>

      {/* Drawer for Filters */}
      <aside className={`drawer ${drawerOpen ? "open" : ""}`}>
        <div className="drawer-content">
          <h2>Filters</h2>
          <div className="drawer-content__body">
            <div className="drawer-content__filter">
              <label htmlFor="date">Date From</label>
              <DatePicker
                id="dateFrom"
                showIcon
                selected={new Date(dateFrom)}
                onChange={(date) => handleDateChange(date, "start")}
              />
            </div>

            <div className="drawer-content__filter">
              <label htmlFor="date">Date To</label>
              <DatePicker
                id="dateTo"
                showIcon
                selected={new Date(dateTo)}
                onChange={(date) => handleDateChange(date, "end")}
              />
            </div>

            <div className="drawer-content__filter">
              <label htmlFor="date">Choose a Category</label>
              <select value={category} onChange={handleCategoryChange}>
                <option value="">All</option>
                {Object.keys(categoryMapping).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="drawer-content__filter">
              <label htmlFor="date">Pick All Sources</label>
              { allSources.map((source) => (
                <div key={source.value}>
                  <input onChange={handleCheckboxChange} type="checkbox" id={source.value} name={source.name} value={source.value} defaultChecked={sources.includes(source.value)} />
                  <label htmlFor={source.value}>{source.name}</label>
                </div>
              ))}
            </div>
          </div>

          {/* User Preferences */}

              <div className="drawer-content__preferences">
                <h3>Preferences</h3>
                  <UserPreference />
              </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
