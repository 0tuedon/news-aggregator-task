import { FC, useState } from "react";
import { News } from "../types";
import { formatDistance } from "date-fns";

const SingleArticle: FC<News> = (props) => {
  const {
    title,
    imgLink,
    description,
    author,
    source,
    publishedAt,
    category,
    url,
  } = props;
  let formattedDate = formatDistance(new Date(publishedAt), new Date());
  const [imageSrc, setImageSrc] = useState(imgLink);

  const handleError = () => {
      setImageSrc("/images/default-image.jpg");
  };

  return (
    <a target="_blank" data-testid="single-article" rel="noreferrer" href={url} className="article">
      <div className="article-body">
        <img className="article-body-image" src={imageSrc} alt={title} onError={handleError} />
        <div className="article-body-content">
          <h3 className="article-body-content__heading">{title}</h3>
          <p className="article-body-content__description">{description}</p>
        </div>
      </div>
      <div className="article-footer">
        <div className="article-footer__up">
          <p>{formattedDate} ago</p>
          <p>
            <span>By {author}</span> | <span>From {source}</span>
          </p>
        </div>

        <div className="article-footer__down">
          <p>Category: {category}</p>
        </div>
      </div>
    </a>
  );
};

export default SingleArticle;
