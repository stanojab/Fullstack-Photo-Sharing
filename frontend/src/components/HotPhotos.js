import { useState, useEffect } from "react";
import Photo from "./Photo";
import "./Feed.css";

function HotPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const get = async () => {
      const res = await fetch("http://localhost:3001/photos/photohot");
      const data = await res.json();
      setPhotos(data);
      setLoading(false);
    };
    get();
  }, []);

  return (
    <div className="sv-feed-page">
      <div className="sv-feed-header">
        <h1 className="sv-feed-title">Hot</h1>
        <p className="sv-feed-sub">Ranked by recent engagement</p>
      </div>
      {loading ? (
        <div className="sv-loading">Loading…</div>
      ) : (
        <div className="sv-feed">
          {photos.map((photo, i) => (
            <div key={photo._id} style={{ animationDelay: `${i * 60}ms` }}>
              <Photo photo={photo} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HotPhotos;
