import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';
import './Photo.css'; // Ensure that the Photo.css file is imported for styling

function Profile() {
    const userContext = useContext(UserContext);
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const getProfile = async () => {
            const res = await fetch("http://localhost:3001/users/profile", {credentials: "include"});
            const data = await res.json();
            setProfile(data);
        };
        getProfile();
    }, []);

    const avatarUrl = profile.path ? `http://localhost:3001${profile.path}` : '';

    return (
        <div className="container">
            {!userContext.user ? <Navigate replace to="/login" /> : ""}
            <div className="row justify-content-center">
                <div className="col-auto">
                    <div className="card bg-dark text-white mb-2">
                        <div className="card-body profile-info">
                            {avatarUrl && <img src={avatarUrl} alt="User Avatar" className="rounded-avatar"/>}
                            <p className="username">{profile.username}</p>
                            <p>{profile.email}</p>
                            <div className="statistics statistics-card">
                                <p>Photos Posted: {profile.photosCount || 0}</p>
                                <p>Likes Received: {profile.likesCount || 0}</p>
                                <p>Comments Made: {profile.commentsCount || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
