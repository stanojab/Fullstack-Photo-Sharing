import { useState } from 'react';
import './Photo.css';
import ReCAPTCHA from 'react-google-recaptcha';

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [capVal, setCapVal] = useState("");

    async function handleRegister(e){
        e.preventDefault();

        const formData = new FormData();
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('image', file);

        const res = await fetch("http://localhost:3001/users", {
            method: 'POST',
            credentials: 'include',
            body: formData
        });

        const data = await res.json();

        if(data._id !== undefined){
            window.location.href="/login";
        }else{
            setUsername("");
            setPassword("");
            setEmail("");
            setError("Registration failed");
        }
    }

    return(
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-auto">
                    <div className="card bg-dark text-white mb-2">
                        <div className="card-body">
                            <form onSubmit={handleRegister} className="form-group">
                                <input type="text" name="email" placeholder="Email" value={email}
                                onChange={(e) => setEmail(e.target.value)} className="form-control"/>
                                <input type="text" name="username" placeholder="Username" value={username}
                                onChange={(e) => setUsername(e.target.value)} className="form-control"/>
                                <input type="password" name="password" placeholder="Password" value={password}
                                onChange={(e) => setPassword(e.target.value)} className="form-control"/>
                                <label className='choose-photo-label' htmlFor="file">Choose an avatar</label>
                                <input 
                                    type="file" 
                                    className="form-control"
                                    id="file" 
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                <ReCAPTCHA
                                sitekey="6Ld89cwpAAAAAE5TQ_dqcZ38cmnwIQ2ssnPGDlIh"
                                onChange={val => setCapVal(val)}
                                />
                                <input type="submit" name="submit" value="Register" 
                                    className="btn btn-primary mt-3"
                                    disabled={!capVal}
                                />
                                {error && <label className="text-danger">{error}</label>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
