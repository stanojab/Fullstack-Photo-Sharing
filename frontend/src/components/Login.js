import { useContext, useState } from "react";
import { UserContext } from "../userContext";
import { Navigate, Link } from "react-router-dom";
import "./AuthForm.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const userContext = useContext(UserContext);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("http://localhost:3001/users/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    setLoading(false);

    if (data._id) {
      userContext.setUserContext(data);
    } else {
      setError("Invalid username or password.");
      setPassword("");
    }
  }

  if (userContext.user) return <Navigate replace to="/" />;

  return (
    <div className="sv-auth-page">
      <div className="sv-auth-card sv-card fade-up">
        <div className="sv-auth-header">
          <h1 className="sv-auth-title">Welcome back</h1>
          <p className="sv-auth-sub">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="sv-auth-form">
          <div className="sv-field">
            <label className="sv-label">Username</label>
            <input
              className="sv-input"
              type="text"
              placeholder="your_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="sv-field">
            <label className="sv-label">Password</label>
            <input
              className="sv-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && <p className="sv-error">{error}</p>}

          <button
            className="sv-btn sv-btn-primary sv-auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="sv-auth-footer">
          No account?{" "}
          <Link to="/register" className="sv-auth-link">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
