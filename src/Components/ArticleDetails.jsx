import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import PostCommentForm from "./PostCommentForm";
import { fetchArticleById, fetchComments, patchVotes } from "../utils/api";

function ArticleDetails() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [voteCount, setVoteCount] = useState(0);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchArticleById(article_id)
      .then((response) => {
        setArticle(response.data.article);
        setVoteCount(response.data.article.votes);
        setCommentCount(response.data.article.comment_count)
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });

    //fetching comments
    fetchComments(article_id)
      .then((response) => {
        setComments(response.data.comments);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, [article_id]);

  const updateVote = (incVote) => {
    const originalCount = voteCount;

    setVoteCount((prevCount) => prevCount + incVote);

    patchVotes().catch((err) => {
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
  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
    setCommentCount((prevCount) => prevCount + 1);
  };

  const handleDelete = (comment_id) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.comment_id !== comment_id)
    );
    setCommentCount((prevCount) => prevCount - 1);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;
  if (!article) return null;

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
      <PostCommentForm
        article_id={article_id}
        onCommentAdded={handleCommentAdded}
      />
      <p>Comments: {commentCount}</p>
      <div className="comments-section">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
}

export default ArticleDetails;
