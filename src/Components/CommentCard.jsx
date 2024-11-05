function CommentCard({ comment }) {
  return (
    <div className="comment-card">
      <p>
        <strong>
          {comment.author} - {new Date(comment.created_at).toLocaleDateString()}
        </strong>
      </p>
      <p>{comment.body}</p>
    </div>
  );
}

export default CommentCard;
