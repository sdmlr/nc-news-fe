import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  return (
    <div>
      <ul>
        <div className="article-card">
          <Link to={`/articles/${article.article_id}`} className="article-link">
            <img
              src={article.article_img_url}
              alt="article image"
              className="article-img"
            />
            <div className="article-content">
              <h3>{article.title}</h3>
              <p>{new Date(article.created_at).toLocaleDateString()}</p>
              <p>Author: {article.author}</p>
              <p>Topic: {article.topic}</p>
              <p>Comments: {article.comment_count}</p>
              <p>Votes: {article.votes}</p>
            </div>
          </Link>
        </div>
      </ul>
    </div>
  );
}

export default ArticleCard;
