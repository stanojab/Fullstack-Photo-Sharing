import "./CommentsList.css";

function CommentsList({ comments }) {
  if (!comments || comments.length === 0) {
    return <p className="sv-no-comments">No comments yet. Be the first.</p>;
  }

  const sorted = [...comments].sort(
    (a, b) => new Date(b.postedAt) - new Date(a.postedAt),
  );

  return (
    <div className="sv-comments-list">
      {sorted.map((c) => (
        <div key={c._id} className="sv-comment">
          <div className="sv-comment-header">
            <span className="sv-comment-author">
              @{c.postedBy?.username ?? "unknown"}
            </span>
            <span className="sv-comment-time">
              {new Date(c.postedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <p className="sv-comment-text">{c.text}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentsList;
