import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext/authContext";

const Register = ({ history }) => {
  const { register, userAuth, error, setError, clearError } = useContext(
    AuthContext
  );

  useEffect(() => {
    if (userAuth) history.push("/");
  }, [userAuth, history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const { name, email, password, password2 } = user;

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (error !== null) {
      clearError();
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (password !== password2) {
      setError("passwords don't match");
    } else {
      register({ name, email, password });
      clearError();
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password2"
          value={password2}
          placeholder="Confirm Password"
          onChange={handleChange}
        />
        <input type="submit" value="Sign up" className="add" />
      </form>
      <div className="question">
        {error && (
          <button className="danger" type="button">
            {error} <span onClick={() => clearError()}>X</span>
          </button>
        )}

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
