import filtersReducer from "../../store/filtersSlice";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import FilterDrawer from "./FilterDrawer";
import { configureStore } from "@reduxjs/toolkit";
import storeConfig from 'redux-mock-store';


const mockStore = storeConfig([]);
let store = mockStore({
    filters:{
        keyword: '',
        category: '',
        isPersonalized: false,
        sources: ['newsAPI', 'guardian', 'nyt'],
        dateFrom: "",
        dateTo: "",
    }
});

const demoStore = configureStore({
    reducer: {
      filters: filtersReducer,
    },
  });


describe("FilterDrawer Component", () => {
  it("renders the FilterDrawer correctly", () => {
    render(
      <Provider store={store}>
        <FilterDrawer />
      </Provider>
    );

    // Check if the FilterDrawer title is rendered
    expect(screen.getByTestId("filters-container")).toBeInTheDocument();
  });

  it("checks/unchecks sources correctly", () => {
    render(
      <Provider store={demoStore}>
        <FilterDrawer />
      </Provider>
    );

    const firstSourceCheckbox = screen.getByTestId("guardian");
    fireEvent.click(firstSourceCheckbox);

    /*
     Check if the checkbox is not checked because by default it is checked 
     so after the first click it should be unchecked
     */
    expect(firstSourceCheckbox).not.toBeChecked();

    fireEvent.click(firstSourceCheckbox);

    expect(firstSourceCheckbox).toBeChecked();
  });

  it("dispatches clearFilters action when Reset Filters is clicked", () => {

    render(
      <Provider store={store}>
        <FilterDrawer />
      </Provider>
    );

    const resetButton = screen.getByTestId("reset-filter");
    fireEvent.click(resetButton);
    
   const actions = store.getActions();
  expect(actions).toContainEqual(expect.objectContaining({ 
    type: 'filters/clearFilters' // use ur clear filter type here
  }));
  });
});
