import { useContext, useEffect, useState } from "react";
import { UserContext } from "../userContext";
import { Navigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const userContext = useContext(UserContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const get = async () => {
      const res = await fetch("http://localhost:3001/users/profile", {
        credentials: "include",
      });
      const data = await res.json();
      setProfile(data);
    };
    get();
  }, []);

  if (!userContext.user) return <Navigate replace to="/login" />;
  if (!profile) return <div className="sv-loading-page">Loading…</div>;

  const avatarUrl = profile.path
    ? `http://localhost:3001${profile.path}`
    : null;
  const initials = profile.username
    ? profile.username.slice(0, 2).toUpperCase()
    : "?";

  return (
    <div className="sv-profile-page fade-up">
      <div className="sv-profile-hero">
        <div className="sv-profile-avatar">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={profile.username}
              className="sv-avatar-img"
            />
          ) : (
            <div className="sv-avatar-placeholder">{initials}</div>
          )}
        </div>
        <div className="sv-profile-identity">
          <h1 className="sv-profile-name">{profile.username}</h1>
          <p className="sv-profile-email">{profile.email}</p>
        </div>
      </div>

      <div className="sv-profile-stats">
        <div className="sv-stat">
          <span className="sv-stat-value">{profile.photosCount ?? 0}</span>
          <span className="sv-stat-label">Photos</span>
        </div>
        <div className="sv-stat-divider" />
        <div className="sv-stat">
          <span className="sv-stat-value">{profile.likesCount ?? 0}</span>
          <span className="sv-stat-label">Likes received</span>
        </div>
        <div className="sv-stat-divider" />
        <div className="sv-stat">
          <span className="sv-stat-value">{profile.commentsCount ?? 0}</span>
          <span className="sv-stat-label">Comments made</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
