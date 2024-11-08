import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchArticles, fetchArticlesByTopic } from "../utils/api";
import ArticleCard from "./ArticleCard";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic")
  
  useEffect(() => {
    setIsLoading(true);

    const fetchData = topic ? fetchArticlesByTopic(topic) : fetchArticles();

    fetchData
      .then((response) => {
        setArticles(response.data.articles);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [searchParams]);

  const handleShowAllArticles = () => {
    setSearchParams({})
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;

  return (
    <>
      <h2>Article {topic ? `for topic: ${topic}` : "List"}</h2>
      <button onClick={handleShowAllArticles}>Show All Articles</button>
      {articles.map((article) => (
        <li key={article.article_id}>
          <ArticleCard article={article} />
        </li>
      ))}
    </>
  );
}

export default ArticleList;
