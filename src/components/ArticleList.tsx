import { News } from "../types";
import "./ArticleList.sass";
import SingleArticles from "./SingleArticles";

const ArticleList = ({ allNews }: { allNews: News[] }) => {
  return (
    <div className="articles">
      <h2>Articles</h2>
      <div className="article-list">
        {/* Map over the articles and display them */}
        {allNews.map((article) => (
          <SingleArticles key={article.url} {...article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
