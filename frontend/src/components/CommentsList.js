import React from 'react';

function CommentsList({ comments }) {
    if (!comments || comments.length === 0) {
        return <p>No comments yet.</p>;
    }

    // Sort comments by 'postedAt' in descending order before rendering
    const sortedComments = comments.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));

    return (
        <div className="container">
            {sortedComments.map(comment => (
                <div key={comment._id} className="card bg-dark text-white mb-2">
                    <div className="card-body">
                        <p>{comment.text}</p>
                        <div className="posted-info">
                            <span className="posted-by">By: {comment.postedBy.username}</span>
                            <span className="posted-at">{new Date(comment.postedAt).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CommentsList;
