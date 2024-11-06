import { useState } from "react";
import { postComment } from "../utils/api";

function PostCommentForm({ article_id, onCommentAdded }) {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);

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
        onCommentAdded(response.data.comment);
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
