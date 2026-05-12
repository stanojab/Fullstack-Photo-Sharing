import { useState } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import "./AuthForm.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [capVal, setCapVal] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleFile(e) {
    const f = e.target.files[0];
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  }

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    if (file) formData.append("image", file);

    const res = await fetch("http://localhost:3001/users", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const data = await res.json();
    setLoading(false);

    if (data._id) {
      window.location.href = "/login";
    } else {
      setError("Registration failed. Please try again.");
    }
  }

  return (
    <div className="sv-auth-page">
      <div className="sv-auth-card sv-card fade-up">
        <div className="sv-auth-header">
          <h1 className="sv-auth-title">Create account</h1>
          <p className="sv-auth-sub">Join SnapVault today</p>
        </div>

        <form onSubmit={handleRegister} className="sv-auth-form">
          <div className="sv-field">
            <label className="sv-label">Email</label>
            <input
              className="sv-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="sv-field">
            <label className="sv-label">Username</label>
            <input
              className="sv-input"
              type="text"
              placeholder="your_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            />
          </div>

          <div className="sv-field">
            <label className="sv-label">
              Avatar <span className="sv-label-opt">(optional)</span>
            </label>
            <label className="sv-file-drop">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="sv-avatar-preview"
                />
              ) : (
                <span className="sv-file-placeholder">
                  Click to choose image
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFile}
                style={{ display: "none" }}
              />
            </label>
          </div>

          <div className="sv-recaptcha-wrap">
            <ReCAPTCHA
              sitekey="6Ld89cwpAAAAAE5TQ_dqcZ38cmnwIQ2ssnPGDlIh"
              theme="dark"
              onChange={(val) => setCapVal(val)}
            />
          </div>

          {error && <p className="sv-error">{error}</p>}

          <button
            className="sv-btn sv-btn-primary sv-auth-submit"
            type="submit"
            disabled={!capVal || loading}
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="sv-auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="sv-auth-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
