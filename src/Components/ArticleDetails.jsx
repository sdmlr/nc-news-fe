import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";

function ArticleDetails() {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);
  const [voteCount, setVoteCount] = useState(article.votes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://news-project-fe7s.onrender.com/api/articles/${article_id}`)
      .then((response) => {
        setArticle(response.data.article);
        setVoteCount(response.data.article.votes);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });

    //fetching comments from articles
    axios
      .get(
        `https://news-project-fe7s.onrender.com/api/articles/${article_id}/comments`
      )
      .then((response) => {
        setComments(response.data.comments);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, [article_id]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;
  if (!article) return null;

  const updateVote = (incVote) => {
    const originalCount = voteCount;

    setVoteCount((prevCount) => prevCount + incVote);

    axios
      .patch(
        `https://news-project-fe7s.onrender.com/api/articles/${article_id}`,
        { inc_votes: incVote }
      )
      .catch((err) => {
        setVoteCount(originalCount);
      });
  };

  const handleUpvote = () => {
    if (!hasUpvoted) {
      setHasUpvoted(true);
      setHasDownvoted(false);
      updateVote(hasDownvoted ? 2 : 1);
    }
  };

  const handleDownvote = () => {
    if (!hasDownvoted) {
      setHasDownvoted(true);
      setHasUpvoted(false);
      updateVote(hasUpvoted ? -2 : -1);
    }
  };

  return (
    <div className="article-details">
      <h2>{article.title}</h2>
      <p>Author: {article.author}</p>
      <p>Topic: {article.topic}</p>
      <p>Created at: {new Date(article.created_at).toLocaleDateString()}</p>
      <p>{article.body}</p>

      <div className="vote-section">
        <p className="vote-count">Votes: {voteCount}</p>
        <button onClick={handleUpvote} disabled={hasUpvoted}>
          +
        </button>
        <button onClick={handleDownvote} disabled={hasDownvoted}>
          -
        </button>
      </div>
      <h3>Comments</h3>
      <p>Comments: {article.comment_count}</p>
      <div className="comments-section">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCard key={comment.comment_id} comment={comment} />
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
}

export default ArticleDetails;
