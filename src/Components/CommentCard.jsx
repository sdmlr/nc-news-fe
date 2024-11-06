import { useState } from "react";
import { deleteCommentById } from "../utils/api";

function CommentCard({ comment, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setIsError(false);

    deleteCommentById(comment.comment_id)
      .then(() => {
        onDelete(comment.comment_id);
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setIsDeleting(false);
        setShowConfirm(false);
      });
  };

  return (
    <div className="comment-card">
      <p>
        <strong>
          {comment.author} - {new Date(comment.created_at).toLocaleDateString()}
        </strong>
      </p>
      <p>{comment.body}</p>
      {showConfirm ? (
        <div>
          <p>Confirm to delete your comment</p>
          <button onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Yes"}
          </button>
          <button onClick={() => setShowConfirm(false)} disabled={isDeleting}>
            No
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowConfirm(true)}
          disabled={isDeleting || comment.author !== "jessjelly"}
        >
          Delete
        </button>
      )}
    </div>
  );
}

export default CommentCard;
