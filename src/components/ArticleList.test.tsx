import { render, screen } from "@testing-library/react";
import ArticleList from "./ArticleList";
import SingleArticle from "./SingleArticle";
import { News } from "../types";

jest.mock("./SingleArticle", () => (props: { title: string }) => (
  <div data-testid="single-article">{props.title}</div>
));

describe("ArticleList component", () => {
  const mockArticles: News[] = [
    {
      title: "Article 1",
      url: "url1",
      description: "Content 1",
      source: "Source 1",
      publishedAt: new Date(),
      author: "Author 1",
      category: "Category 1",
      imgLink: "imgLink1",
    },
    {
      title: "Article 2",
      url: "url2",
      description: "Content 2",
      source: "Source 2",
      publishedAt: new Date(),
      author: "Author 2",
      category: "Category 2",
      imgLink: "imgLink2",
    },
  ];

  test("renders the correct number of articles", () => {
    render(<ArticleList allNews={mockArticles} />);
    const articles = screen.getAllByTestId("single-article");
    expect(articles.length).toBe(mockArticles.length);
  });

  test("renders no articles when allNews is empty", () => {
    render(<ArticleList allNews={[]} />);
    expect(screen.queryByTestId("single-article")).not.toBeInTheDocument();
  });
});
