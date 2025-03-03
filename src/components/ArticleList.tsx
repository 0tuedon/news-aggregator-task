import { News } from "../types";
import "./ArticleList.sass";
import SingleArticle from "./SingleArticle";

const ArticleList = ({ allNews }: { allNews: News[] }) => {
  return (
    <div className="articles" data-testid="article-list">
      <div className="article-list">
        {/* Map over the articles and display them */}
        {allNews.map((article) => (
          <SingleArticle data-testid="single-article"  key={article.url} {...article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
