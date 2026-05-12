import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const { user } = useContext(UserContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sv-header">
      <div className="sv-header-inner">
        <Link to="/" className="sv-logo">
          <span className="sv-logo-mark">S</span>
          <span className="sv-logo-text">napVault</span>
        </Link>

        <nav className="sv-nav">
          <Link
            to="/"
            className={`sv-nav-link ${isActive("/") ? "active" : ""}`}
          >
            New
          </Link>
          {user && (
            <Link
              to="/hotphotos"
              className={`sv-nav-link ${isActive("/hotphotos") ? "active" : ""}`}
            >
              Hot
            </Link>
          )}

          <div className="sv-nav-divider" />

          {user ? (
            <>
              <Link
                to="/publish"
                className="sv-btn sv-btn-primary sv-nav-publish"
              >
                + Publish
              </Link>
              <Link
                to="/profile"
                className={`sv-nav-link ${isActive("/profile") ? "active" : ""}`}
              >
                {user.username}
              </Link>
              <Link to="/logout" className="sv-nav-link sv-nav-logout">
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`sv-nav-link ${isActive("/login") ? "active" : ""}`}
              >
                Login
              </Link>
              <Link to="/register" className="sv-btn sv-btn-primary">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
