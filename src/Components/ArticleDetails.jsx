import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ArticleDetails() {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://news-project-fe7s.onrender.com/api/articles/${article_id}`)
      .then((response) => {
        setArticle(response.data.article);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;
  if (!article) return null;

  return (
    <div>
      <h2>{article.title}</h2>
      <p>Author: {article.author}</p>
      <p>Topic: {article.topic}</p>
      <p>Created at: {article.created_at}</p>
      <p>{article.body}</p>
      <p>Comments: {article.comment_count}</p>
    </div>
  );
}

export default ArticleDetails
