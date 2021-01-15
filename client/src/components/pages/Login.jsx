import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext/authContext";

const Login = props => {
  const { login, userAuth, error, clearError } = useContext(AuthContext);

  useEffect(() => {
    if (userAuth) props.history.push("/");
    // eslint-disable-next-line
  }, [userAuth]);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const { email, password } = user;

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
    clearError();
  };

  const handleSubmit = e => {
    e.preventDefault();

    login({
      email,
      password
    });
    clearError();
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <input type="submit" value="Sign In" className="add" />
      </form>
      <div className="question">
        {/* {error && <div className="alert alert-danger">{error}</div>} */}
        {error && (
          <button className="danger" type="button">
            {error} <span onClick={() => clearError()}>X</span>
          </button>
        )}
        <p>
          Don't have an account yet? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
