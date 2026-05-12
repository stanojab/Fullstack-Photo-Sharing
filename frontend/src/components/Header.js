import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from "react-router-dom";
import './Header.css'

function Header(props) {
    const { user } = useContext(UserContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark glass-navbar">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to='/'>Home</Link>
                    </li>
                    {user ? (
                        <>
                            <li className="nav-item"><Link className="nav-link" to='/hotphotos/'>Hot</Link></li>
                            <li className="nav-item"><Link className="nav-link" to='/publish'>Publish</Link></li>
                            <li className="nav-item"><Link className="nav-link" to='/profile'>Profile</Link></li>
                            <li className="nav-item"><Link className="nav-link" to='/logout'>Logout</Link></li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item"><Link className="nav-link" to='/login'>Login</Link></li>
                            <li className="nav-item"><Link className="nav-link" to='/register'>Register</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Header;
