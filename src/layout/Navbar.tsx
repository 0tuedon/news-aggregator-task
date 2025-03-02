// Styles
import "./Navbar.sass";
// Packages
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RiSettings3Line } from "react-icons/ri";
//  Local Imports
import { RootState } from "../store";
import {
  setCategory,
  setKeyword,
} from "../store/filtersSlice";
import { categoryMapping } from "../utils/data";
import UserPreference from "./UserPreference";
import { NavLink, useSearchParams } from "react-router";
import Wrapper from "../components/drawer/Wrapper";

const Navbar = () => {
  let [searchParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const keyword = useSelector((state: RootState) => state.filters.keyword);

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    dispatch(setKeyword(e.target.value));
  };

  const handleDrawerOnClick = () => {
    setDrawerOpen(!drawerOpen);
  };


  const handleCategoryChange = (category: string) => {
    searchParams.set("categories", encodeURI(category));
    dispatch(setCategory(category));
  };


  return (
    <>
      <nav className="navbar">
        <div className="navbar-up-container">
          <div className="navbar-up-container__search">
            <input
              type="text"
              value={keyword}
              placeholder="Search"
              onChange={handleSearch}
            />
            <RiSettings3Line
              size={25}
              className=""
              onClick={handleDrawerOnClick}
              color="white"
            />
          </div>
        </div>
        <div className="navbar-down-container">
          <div className="navbar-down-container__links">
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/"
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/for-you"
              className={({ isActive }) => (isActive ? "active" : "")}
              end
            >
              For You
            </NavLink>
          </div>
          <div className="divider"></div>
          <div className="navbar-down-container__categories hide-scrollbar">
            {Object.keys(categoryMapping).map((category) => (
              <NavLink
                to={`?categories=${encodeURI(category)}`}
                className={() =>
                  searchParams.get("categories") === encodeURI(category)
                    ? "active"
                    : ""
                }
                key={category}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <Wrapper drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}>
        <UserPreference />
      </Wrapper>
    </>
  );
};

export default Navbar;
