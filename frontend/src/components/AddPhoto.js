import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../userContext';
import './Photo.css';

function AddPhoto(props) {
    const userContext = useContext(UserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [uploaded, setUploaded] = useState(false);

    async function onSubmit(e) {
        e.preventDefault();

        if (!name) {
            alert("Please enter a name!");
            return;
        }

        if (!description) {
            alert("Please enter a description!");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('image', file);
        
        const res = await fetch('http://localhost:3001/photos', {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        const data = await res.json();

        if (data._id) {
            setUploaded(true);
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-auto">
                    <div className="card bg-dark text-white mb-2">
                        <div className="card-body">
                            <form className="form-group" onSubmit={onSubmit}>
                                {!userContext.user ? <Navigate replace to="/login" /> : ""}
                                {uploaded ? <Navigate replace to="/" /> : ""}
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="name" 
                                    placeholder="Name of the photo" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="description" 
                                    placeholder="Description of the photo" 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <label className='choose-photo-label' htmlFor="file">Choose a photo</label>
                                <input 
                                    type="file" 
                                    className="form-control"
                                    id="file" 
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                <input 
                                    className="btn btn-primary mt-3" 
                                    type="submit" 
                                    name="submit" 
                                    value="Upload" 
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddPhoto;
