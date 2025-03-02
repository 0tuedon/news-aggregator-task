import "./FilterDrawer.sass";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { formatDate } from "date-fns";
import {
  setCategory,
  setDateFrom,
  setDateTo,
  setSources,
} from "../../store/filtersSlice";
import { allSources, categoryMapping } from "../../utils/data";

const FilterDrawer = () => {
  const dispatch = useDispatch();
  const dateFrom = useSelector((state: RootState) => state.filters.dateFrom);
  const dateTo = useSelector((state: RootState) => state.filters.dateTo);
  const sources = useSelector((state: RootState) => state.filters.sources);
  const category = useSelector((state: RootState) => state.filters.category);

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
    if (sources.includes(e.target.value)) {
      dispatch(
        setSources(sources.filter((source) => source !== e.target.value))
      );
      return;
    }
    dispatch(setSources([...sources, e.target.value]));
  };

  return (
    <div className="filter-content__body">
      <div className="filter-content__filter">
        <label htmlFor="date">Date From</label>
        <DatePicker
          id="dateFrom"
          selected={new Date(dateFrom)}
          onChange={(date) => handleDateChange(date, "start")}
        />
      </div>

      <div className="filter-content__filter">
        <label htmlFor="date">Date To</label>
        <DatePicker
          className="date-picker"
          id="dateTo"
          selected={new Date(dateTo)}
          onChange={(date) => handleDateChange(date, "end")}
        />
      </div>
      <div className="filter-content__filter category">
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
      <div className="filter-content__filter">
        <label htmlFor="date">Pick Sources</label>
        {allSources.map((source) => (
          <div key={source.value}>
            <input
              onChange={handleCheckboxChange}
              type="checkbox"
              id={source.value}
              name={source.name}
              value={source.value}
              defaultChecked={sources.includes(source.value)}
            />
            <label htmlFor={source.value}>{source.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterDrawer;
