import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../userContext";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";
import "./PhotoView.css";

function PhotoView() {
  const { photoId } = useParams();
  const { user } = useContext(UserContext);
  const [photo, setPhoto] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const fetchPhoto = async () => {
    const res = await fetch(`http://localhost:3001/photos/${photoId}`);
    const data = await res.json();
    setPhoto(data);
    setLikes(data.likes);
    setDislikes(data.dislikes);
  };

  useEffect(() => {
    fetchPhoto();
  }, [photoId]);

  const handleLike = async () => {
    if (!user) return;
    const res = await fetch(`http://localhost:3001/photos/${photoId}/like`, {
      method: "POST",
    });
    if (res.ok) setLikes((l) => l + 1);
  };

  const handleDislike = async () => {
    if (!user) return;
    const res = await fetch(`http://localhost:3001/photos/${photoId}/dislike`, {
      method: "POST",
    });
    if (res.ok) setDislikes((d) => d + 1);
  };

  if (!photo) return <div className="sv-view-loading">Loading…</div>;

  const authorName = photo.postedBy?.username ?? "unknown";
  const postedDate = new Date(photo.postedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="sv-view-page">
      <div className="sv-view-layout">
        {/* Image */}
        <div className="sv-view-img-wrap">
          <img
            className="sv-view-img"
            src={`http://localhost:3001/${photo.path}`}
            alt={photo.name}
          />
        </div>

        {/* Sidebar */}
        <aside className="sv-view-sidebar">
          <Link to="/" className="sv-back-link">
            ← Back to feed
          </Link>

          <div className="sv-view-meta">
            <span className="sv-view-author">@{authorName}</span>
            <span className="sv-view-date">{postedDate}</span>
          </div>

          <h1 className="sv-view-title">{photo.name}</h1>
          {photo.description && (
            <p className="sv-view-desc">{photo.description}</p>
          )}

          <div className="sv-view-actions">
            <button
              className="sv-vote-btn sv-vote-like"
              onClick={handleLike}
              disabled={!user}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
              <span>{likes}</span>
            </button>
            <button
              className="sv-vote-btn sv-vote-dislike"
              onClick={handleDislike}
              disabled={!user}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z" />
                <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
              </svg>
              <span>{dislikes}</span>
            </button>
          </div>

          <hr className="sv-divider" />

          <h2 className="sv-comments-heading">
            Comments
            {photo.comments?.length > 0 && (
              <span className="sv-comments-count">{photo.comments.length}</span>
            )}
          </h2>

          {user ? (
            <CommentForm photoId={photoId} onCommentPosted={fetchPhoto} />
          ) : (
            <p className="sv-login-prompt">
              <Link to="/login" className="sv-auth-link">
                Sign in
              </Link>{" "}
              to leave a comment.
            </p>
          )}

          <CommentsList comments={photo.comments} />
        </aside>
      </div>
    </div>
  );
}

export default PhotoView;
