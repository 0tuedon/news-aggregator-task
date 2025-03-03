import { render, screen, fireEvent } from "@testing-library/react";
import Wrapper from "./Wrapper";
import React from "react";


// Mock the close icon component to avoid unnecessary dependencies
jest.mock("react-icons/io5", () => ({
  IoCloseCircle: ({ onClick }: { onClick: () => void }) => (
    <button data-testid="close-icon" onClick={onClick} />
  ),
}));

describe("Wrapper component", () => {
  test("renders children when drawer is open", () => {
    render(
      <Wrapper drawerOpen={true} setDrawerOpen={jest.fn()}>
        <div data-testid="child">Test Content</div>
      </Wrapper>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  test("adds 'open' class when drawerOpen is true", () => {
    render(
      <Wrapper drawerOpen={true} setDrawerOpen={jest.fn()}>
        <div>Test Content</div>
      </Wrapper>
    );
    expect(screen.getByTestId("wrapper")).toHaveClass("open");
  });

  test("clicking close icon calls setDrawerOpen with false", () => {
    const setDrawerOpenMock = jest.fn();
    render(
      <Wrapper drawerOpen={true} setDrawerOpen={setDrawerOpenMock}>
        <div>Test Content</div>
      </Wrapper>
    );
    fireEvent.click(screen.getByTestId("close-icon"));
    expect(setDrawerOpenMock).toHaveBeenCalledWith(false);
  });
});
