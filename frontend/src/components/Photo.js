import { useContext, useState } from "react";
import { UserContext } from "../userContext";
import { Link } from "react-router-dom";
import "./Photo.css";

function Photo({ photo }) {
  const { user } = useContext(UserContext);
  const [likes, setLikes] = useState(photo.likes);
  const [dislikes, setDislikes] = useState(photo.dislikes);
  const [reports, setReports] = useState(photo.reports);
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  const postedDate = new Date(photo.postedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const authorName = photo.postedBy?.username ?? "unknown";

  const handleLike = async () => {
    if (!user) {
      alert("Please log in to like photos.");
      return;
    }
    const res = await fetch(`http://localhost:3001/photos/${photo._id}/like`, {
      method: "POST",
    });
    if (res.ok) setLikes((l) => l + 1);
  };

  const handleDislike = async () => {
    if (!user) {
      alert("Please log in to dislike photos.");
      return;
    }
    const res = await fetch(
      `http://localhost:3001/photos/${photo._id}/dislike`,
      { method: "POST" },
    );
    if (res.ok) setDislikes((d) => d + 1);
  };

  const handleReport = async () => {
    if (!user) {
      alert("Please log in to report photos.");
      return;
    }
    if (!window.confirm("Report this photo?")) return;
    const res = await fetch(
      `http://localhost:3001/photos/${photo._id}/report`,
      { method: "POST" },
    );
    if (res.ok) {
      const next = reports + 1;
      setReports(next);
      if (next > 2) setHidden(true);
    }
  };

  const imgEl = (
    <img
      className="sv-photo-img"
      src={`http://localhost:3001/${photo.path}`}
      alt={photo.name}
      loading="lazy"
    />
  );

  return (
    <article className="sv-card sv-photo-card fade-up">
      {/* Image */}
      <div className="sv-photo-img-wrap">
        {user ? (
          <Link to={`/${photo._id}`}>{imgEl}</Link>
        ) : (
          <div
            onClick={() => alert("Please log in to view photo details.")}
            style={{ cursor: "pointer" }}
          >
            {imgEl}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="sv-photo-body">
        <div className="sv-photo-meta">
          <span className="sv-photo-author">@{authorName}</span>
          <span className="sv-photo-date">{postedDate}</span>
        </div>

        <h2 className="sv-photo-title">
          {user ? <Link to={`/${photo._id}`}>{photo.name}</Link> : photo.name}
        </h2>

        {photo.description && (
          <p className="sv-photo-desc">{photo.description}</p>
        )}

        {/* Actions */}
        <div className="sv-photo-actions">
          <button
            className="sv-action-btn sv-like"
            onClick={handleLike}
            title="Like"
          >
            <svg
              width="15"
              height="15"
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
            className="sv-action-btn sv-dislike"
            onClick={handleDislike}
            title="Dislike"
          >
            <svg
              width="15"
              height="15"
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

          <div className="sv-action-spacer" />

          <button
            className="sv-action-btn sv-report"
            onClick={handleReport}
            title="Report"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" y1="22" x2="4" y2="15" />
            </svg>
          </button>

          {user && (
            <Link
              to={`/${photo._id}`}
              className="sv-action-btn sv-comment-link"
              title="Comments"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              {photo.comments?.length > 0 && (
                <span>{photo.comments.length}</span>
              )}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default Photo;
