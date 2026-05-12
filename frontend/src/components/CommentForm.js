import { useState, useContext } from "react";
import { UserContext } from "../userContext";
import "./CommentForm.css";

function CommentForm({ photoId, onCommentPosted }) {
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setLoading(true);

    const res = await fetch(
      `http://localhost:3001/photos/${photoId}/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: comment, postedBy: user._id }),
      },
    );

    setLoading(false);
    if (res.ok) {
      setComment("");
      onCommentPosted();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sv-comment-form">
      <textarea
        className="sv-input sv-comment-textarea"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment…"
        rows={3}
      />
      <button
        className="sv-btn sv-btn-primary sv-comment-submit"
        type="submit"
        disabled={loading || !comment.trim()}
      >
        {loading ? "Posting…" : "Post"}
      </button>
    </form>
  );
}

export default CommentForm;
