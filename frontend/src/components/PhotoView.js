import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../userContext';
import { useParams } from 'react-router-dom';
import Photo from './Photo';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';


function PhotoView() {
    const { photoId } = useParams();
    const [photo, setPhoto] = useState(null);
    const { user } = useContext(UserContext);

    const fetchPhoto = async () => {
        const response = await fetch(`http://localhost:3001/photos/${photoId}`);
        const data = await response.json();
        setPhoto(data);
        console.log(data);
    };

    useEffect(() => {
        fetchPhoto();
    }, [photoId]);

    const handleCommentPosted = () => {
        fetchPhoto();
    };

    if (!photo) return <div>Loading...</div>;

    return (
        <div>
            <Photo photo={photo} />
            <CommentForm photoId={photoId} onCommentPosted={handleCommentPosted}/>
            <CommentsList comments={photo.comments} />
        </div>
    );
}

export default PhotoView;
