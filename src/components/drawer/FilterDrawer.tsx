import "./FilterDrawer.sass";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { format } from "date-fns";
import {
  clearFilters,
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
  const sources = useSelector((state: RootState) => state.filters.sources) || [];
  const category = useSelector((state: RootState) => state.filters.category);

  // Helper function to prevent future dates and enforce constraints
  const handleDateChange = (date: Date | null, range: "start" | "end") => {
    if (!date) return;
    let startDate = new Date(dateFrom || new Date());
    const today = new Date();
    let selectedDate = date > today ? today : date; 
    let formattedDate = format(selectedDate, "yyyy-MM-dd");

    if (range === "end") {
      if (selectedDate < new Date(startDate)) {
        dispatch(setDateFrom(formattedDate)); 
      }
      dispatch(setDateTo(formattedDate));
    } else {
      if (selectedDate > new Date(dateTo)) {
        dispatch(setDateTo(formattedDate)); // If DateFrom > DateTo, set DateTo = DateFrom
      }
      dispatch(setDateFrom(formattedDate));
    }
  };

  // Handle source selection
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (sources.includes(value)) {
      dispatch(setSources(sources.filter((source) => source !== value))); // Remove source
    } else {
      dispatch(setSources([...sources, value])); // Add source
    }
  };

  return (
    <div className="filter-content__body">
      <div className="filter-content__header">
        <h2>Filters</h2>
          <button className="filter-content__clear" onClick={() => dispatch(clearFilters())}>
            Reset Filters
          </button>
      </div>
      <div className="filter-content__filter">
        <label htmlFor="dateFrom">Date From</label>
        <DatePicker
          id="dateFrom"
          selected={dateFrom ? new Date(dateFrom) : new Date()}
          onChange={(date) => handleDateChange(date, "start")}
          maxDate={new Date()} // Prevent future dates
          showYearDropdown
          scrollableYearDropdown
        />
      </div>

      <div className="filter-content__filter">
        <label htmlFor="dateTo">Date To</label>
        <DatePicker
          id="dateTo"
          selected={dateTo ? new Date(dateTo) : new Date()}
          onChange={(date) => handleDateChange(date, "end")}
          minDate={dateFrom ? new Date(dateFrom) : undefined} // Prevent DateTo < DateFrom
          maxDate={new Date()} // Prevent future dates
        />
      </div>

      <div className="filter-content__filter category">
        <label htmlFor="category">Choose a Category</label>
        <select
          value={category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
        >
          <option value="">All</option>
          {Object.keys(categoryMapping).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-content__filter">
        <label>Pick Sources</label>
        {allSources.map((source) => (
          <div key={source.value}>
            <input
              type="checkbox"
              id={source.value}
              name={source.name}
              value={source.value}
              onChange={handleCheckboxChange}
              checked={sources.includes(source.value)} // Ensure sources is always an array
            />
            <label htmlFor={source.value}>{source.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterDrawer;
