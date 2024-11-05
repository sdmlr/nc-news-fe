import { Link } from "react-router-dom";

function ArticleCard({ articles = [] }) {
  return (
    <>
      <ul className="article-list">
        {articles.map((article) => (
          <li key={article.article_id} className="article-card">
            <Link to={`/articles/${article.article_id}`} className="article-link">
              <img
                src={article.article_img_url}
                alt="article image"
                className="article-img"
              />
              <div className="article-content">
                <h3>{article.title}</h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ArticleCard;
