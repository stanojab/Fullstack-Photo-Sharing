import { UserContext } from "../userContext";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Photo.css";

function Photo(props) {
  const { user } = useContext(UserContext);
  const [likes, setLikes] = useState(props.photo.likes);
  const [dislikes, setDislikes] = useState(props.photo.dislikes);
  const [reports, setReports] = useState(props.photo.reports);

  const postedDate = new Date(props.photo.postedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  const handleLike = async () => {
    if (!user) {
      alert("Please log in to like the photo!");
      return;
    }

    const res = await fetch(
      `http://localhost:3001/photos/${props.photo._id}/like`,
      {
        method: "POST",
      },
    );

    if (res.ok) {
      setLikes(likes + 1);
    }
  };

  const handleDislike = async () => {
    if (!user) {
      alert("Please log in to dislike photos!");
      return;
    }

    const res = await fetch(
      `http://localhost:3001/photos/${props.photo._id}/dislike`,
      {
        method: "POST",
      },
    );

    if (res.ok) {
      setDislikes(dislikes + 1);
    }
  };

  const handleReport = async () => {
    if (!user) {
      alert("Please log in to report photos!");
      return;
    }

    const res = await fetch(
      `http://localhost:3001/photos/${props.photo._id}/report`,
      {
        method: "POST",
      },
    );

    if (res.ok) {
      setReports(reports + 1);
      if (reports + 1 > 2) {
        window.location.reload();
      }
    }
  };

  const imageComponent = (
    <img
      className="card-img"
      src={`http://localhost:3001/${props.photo.path}`}
      alt={props.photo.name}
    />
  );

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-auto">
          <div className="card bg-dark text-white mb-2">
            <h5
              className="card-title text-center font-weight-bold"
              style={{ fontSize: "24px", padding: "5px" }}
            >
              {props.photo.name}
            </h5>
            {user ? (
              <Link to={`/${props.photo._id}`}>{imageComponent}</Link>
            ) : (
              <div
                onClick={() => alert("Please log in to view photo details!")}
              >
                {imageComponent}
              </div>
            )}
            <div className="card-body">
              <div className="reaction-buttons">
                <button className="like-button" onClick={handleLike}>
                  <FontAwesomeIcon className="fa-icon" icon={faThumbsUp} />
                  <span className="counter"> ({likes})</span>
                </button>
                <button className="dislike-button" onClick={handleDislike}>
                  <FontAwesomeIcon className="fa-icon" icon={faThumbsDown} />
                  <span className="counter"> ({dislikes})</span>
                </button>
                <button className="report-button" onClick={handleReport}>
                  <FontAwesomeIcon
                    className="fa-icon"
                    icon={faExclamationCircle}
                  />
                </button>
              </div>
              <div className="posted-info">
                <span className="posted-at"> on {postedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Photo;
