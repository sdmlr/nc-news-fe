import { Link } from "react-router-dom";

function ArticleCard({ articles = [] }) {
  return (
    <>
      <ul>
        {articles.map((article) => (
          <li key={article.article_id}>
            <Link to={`/articles/${article.article_id}`}>
              <img src={article.article_img_url} alt="article image" />
            </Link>
            <h3>{article.title}</h3>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ArticleCard;
