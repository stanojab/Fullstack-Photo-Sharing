import { useContext, useState } from "react";
import { UserContext } from "../userContext";
import { Navigate } from "react-router-dom";
import "./Photo.css";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const userContext = useContext(UserContext);

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/users/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (data._id !== undefined) {
      userContext.setUserContext(data);
    } else {
      setUsername("");
      setPassword("");
      setError("Invalid username or password");
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-auto">
          <div className="card bg-dark text-white mb-2">
            <div className="card-body">
              <form onSubmit={handleLogin}>
                {userContext.user ? <Navigate replace to="/" /> : ""}
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
                <input
                  type="submit"
                  name="submit"
                  value="Log in"
                  className="btn btn-primary mt-3"
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

export default Login;
