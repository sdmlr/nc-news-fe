import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchArticles, fetchArticlesByTopic } from "../utils/api";
import ArticleCard from "./ArticleCard";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic");
  const [sortField, setSortField] = useState(
    searchParams.get("sort_by") || "created_at"
  );
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("order") || "desc"
  );

  useEffect(() => {
    setIsLoading(true);

    const params = { sort_by: sortField, order: sortOrder };
    if (topic) params.topic = topic;
    setSearchParams(params, { replace: true });

    const fetchData = topic
      ? fetchArticlesByTopic(topic, sortField, sortOrder)
      : fetchArticles(sortField, sortOrder);

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
  }, [topic, sortField, sortOrder, setSearchParams]);

  const handleShowAllArticles = () => {
    setSearchParams({});
    setSortField("created_at");
    setSortOrder("desc");
  };

  const handleSortChange = (e) => {
    const newSortField = e.target.value;
    setSortField(newSortField);
  };

  const handleOrderToogle = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
  };
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;

  return (
    <div className="article-page-container">
      <h2>Articles {topic ? `for topic: ${topic}` : ""}</h2>
      <div className="sorting-container">
        <button onClick={handleShowAllArticles}>Show All Articles</button>
        <label htmlFor="sortField">Sort by:</label>
        <select id="sortField" value={sortField} onChange={handleSortChange}>
          <option value="created_at">Date</option>
          <option value="comment_count">Comments</option>
          <option value="votes">Votes</option>
        </select>

        <button onClick={handleOrderToogle}>Order ({sortOrder})</button>
      </div>
      <div className="article-list">
        <ul>
          {articles.map((article) => (
            <li key={article.article_id}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ArticleList;
