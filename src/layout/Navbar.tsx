// Styles
import "./Navbar.sass";
// Packages
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import DatePicker from "react-datepicker";
//  Local Imports
import { RootState } from "../store";
import { setDateFrom, setDateTo, setKeyword } from "../store/filtersSlice";
import FilterMenuIcon from "../components/icons/FilterMenuIcon";
import { formatDate } from "date-fns";


const Navbar = () => {
  const dispatch = useDispatch();
  const keyword = useSelector((state: RootState) => state.filters.keyword);
  const dateFrom = useSelector((state: RootState) => state.filters.dateFrom);
  const dateTo = useSelector((state: RootState) => state.filters.dateTo);
  // Local States
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    dispatch(setKeyword(e.target.value));
  };

  const handleDrawerOnClick = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDateChange = (date: Date | null, range: "start" | "end"  ) => { 
    let formattedDate = formatDate(date || new Date(), "yyyy-MM-dd");
    if(range === "end") {
      dispatch(setDateTo(formattedDate));
      return;
    }  
    dispatch(setDateFrom(formattedDate));
  }
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
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
