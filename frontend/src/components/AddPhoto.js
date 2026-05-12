import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../userContext";
import "./AddPhoto.css";

function AddPhoto() {
  const userContext = useContext(UserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!userContext.user) return <Navigate replace to="/login" />;
  if (uploaded) return <Navigate replace to="/" />;

  function handleFile(e) {
    const f = e.target.files[0];
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter a title.");
      return;
    }
    if (!file) {
      setError("Please choose an image.");
      return;
    }
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", file);
    formData.append("postedAt", new Date().toISOString());

    const res = await fetch("http://localhost:3001/photos", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const data = await res.json();
    setLoading(false);
    if (data._id) setUploaded(true);
    else setError("Upload failed. Please try again.");
  }

  return (
    <div className="sv-publish-page">
      <div className="sv-publish-layout">
        {/* Preview panel */}
        <div className="sv-preview-panel">
          <label className="sv-dropzone" htmlFor="sv-file-input">
            {preview ? (
              <img src={preview} alt="preview" className="sv-preview-img" />
            ) : (
              <div className="sv-dropzone-empty">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span>Click to choose photo</span>
              </div>
            )}
            <input
              id="sv-file-input"
              type="file"
              accept="image/*"
              onChange={handleFile}
              style={{ display: "none" }}
            />
          </label>
        </div>

        {/* Form panel */}
        <div className="sv-publish-form-panel">
          <h1 className="sv-publish-title">Publish a photo</h1>
          <p className="sv-publish-sub">Share your work with the community</p>

          <form onSubmit={onSubmit} className="sv-publish-form">
            <div className="sv-field">
              <label className="sv-label">Title</label>
              <input
                className="sv-input"
                type="text"
                placeholder="Give your photo a name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="sv-field">
              <label className="sv-label">
                Description <span className="sv-label-opt">(optional)</span>
              </label>
              <textarea
                className="sv-input sv-textarea"
                placeholder="What's the story behind this shot?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            {error && <p className="sv-error">{error}</p>}

            <button
              className="sv-btn sv-btn-primary sv-publish-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? "Uploading…" : "Publish photo"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPhoto;
