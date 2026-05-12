import React, { useState, useContext } from 'react';
import { UserContext } from '../userContext';
import './Photo.css';

function CommentForm({ photoId, onCommentPosted }) {
    const { user } = useContext(UserContext);
    const [comment, setComment] = useState('');

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user) {
            alert('Please log in to post comments.');
            return;
        }
        if (comment.trim() === '') {
            alert('Comment cannot be empty.');
            return;
        }

        const response = await fetch(`http://localhost:3001/photos/${photoId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: comment, postedBy: user._id })
        });

        if (response.ok) {
            setComment('');
            onCommentPosted();
        } else {
            alert('Failed to add comment. Please try again.');
        }
    };

    return (
        <div className='comment-form-container'>
            <div className="container">
                <form onSubmit={handleSubmit} className="card-body container-darker">
                    <textarea
                        className="form-control"
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Write a comment..."
                        rows="2"
                        style={{ width: '100%' }}
                    ></textarea>
                    <button type="submit" className="comment-button"><strong>Post Comment</strong></button>
                </form>
            </div>
        </div>
    );
}

export default CommentForm;
