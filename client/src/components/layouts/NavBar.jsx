import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext/authContext";

const NavBar = () => {
  const { logout, clearError, userAuth, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    clearError();
  };

  const authLinks = (
    <React.Fragment>
      <li>
        <Link to="/register" className="authlinks">
          Register
        </Link>
      </li>
      <span className="sm-hide">|</span>

      <li>
        <Link to="/login" className="authlinks">
          Login
        </Link>
      </li>
    </React.Fragment>
  );

  const userLinks = (
    <React.Fragment>
      <li>Hello {user && user.name}</li>
      <span className="sm-hide">|</span>

      <li onClick={handleLogout}>
        <span className="sm-hide">Logout</span>
        <i className="fas fa-sign-out-alt"></i>
      </li>
    </React.Fragment>
  );

  return (
    <div className="navbar">
      <div className="logo my-4">
        <h1>
          <i className="fas fa-utensils"></i>
          Party App
        </h1>
        {/* <p>
          Made with <span>❤</span> by Nadia
        </p> */}
      </div>
      <ul>{userAuth ? userLinks : authLinks}</ul>
    </div>
  );
};

export default NavBar;

//Mosh's implementation

// {!user && (
//   <React.Fragment>
//     <li className="nav-item">
//       <NavLink className="nav-link" to="/login">
//         Login
//       </NavLink>
//     </li>
//     <li className="nav-item">
//       <NavLink className="nav-link" to="/register">
//         Register
//       </NavLink>
//     </li>
//   </React.Fragment>
// )}

// {user && (
//   <React.Fragment>
//     <li className="nav-item">
//       <NavLink className="nav-link" to="/profile">
//         {user.name}
//       </NavLink>
//     </li>
//     <li className="nav-item">
//       <NavLink className="nav-link" to="/logout">
//         Logout
//       </NavLink>
//     </li>
//   </React.Fragment>
// )}
