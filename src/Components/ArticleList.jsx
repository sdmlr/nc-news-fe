import { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import { fetchArticles } from "../utils/api";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    axios
    fetchArticles()
      .then((response) => {
        setArticles(response.data.articles);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        console.error("error fetching articles", err);
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;

  return (
    <>
      <h2>Article List</h2>
      {articles.map((article) => (
        <li key={article.article_id}>
          <ArticleCard article={article} />
        </li>
      ))}
    </>
  );
}

export default ArticleList;
