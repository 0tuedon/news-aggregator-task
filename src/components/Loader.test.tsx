import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

test("renders the loader component", () => {
  render(<Loader />);
  const loaderElement = screen.getByTestId("loader");
  expect(loaderElement).toBeInTheDocument();
});