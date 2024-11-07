import { useState } from "react";
import { postComment } from "../utils/api";

function PostCommentForm({ article_id }) {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);

  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
    setCommentCount((prevCount) => prevCount + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!commentText) {
      setIsError("Enter text before submitting");
      return;
    }

    setIsSubmitting(true);
    setIsError(false);

    const newComment = {
      username: "jessjelly",
      body: commentText
    };

    postComment(article_id, newComment)
      .then((response) => {
        handleCommentAdded(response.data.comment);
        setCommentText("");
      })
      .catch((err) => {
        setIsError("Failed to post. Please try again");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add your comment"
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}

export default PostCommentForm;
