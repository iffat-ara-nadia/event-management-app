import React, { useReducer } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode"; //jwtDecode is the default function/object
import AuthContext from "./authContext";
import authReducer from "./authReducer";

const AuthState = ({ children }) => {
  const initialState = {
    user: null,
    userAuth: null, //???
    error: null //???

    // userAuth: "",
    // errors: {}
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //get current User
  const getUser = () => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt); //If we pass null/an empty string/invalid jwt to this Decode(), we will get an exception
      console.log(user);
      dispatch({
        type: "SET_USER",
        payload: user
      });
    } catch (ex) {
      return null;
    } //If we have an error, we just ignore that.Technically this is not an application error, this is only to handle the scenario where we don't have a valid jwt in the localStorage.}
  };

  //Register User
  const register = async user => {
    try {
      const response = await axios.post(
        //mY ERROR: Didn't write await keyword, so got response of undefined for 2 days.
        "http://localhost:5000/api/register",
        user
      );
      console.log(response);
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: response.headers["x-auth-token"] // To access custom token 'x-auth-token' from the client side, have to add a header method in backend (ref. register.js)
      });
    } catch (ex) {
      console.log(ex.response.data);
      //   if (ex.response && ex.response.status === 400) {
      dispatch({
        type: "REGISTER_FAIL",
        payload: ex.response.data
      });
      // }
    }
  };

  //Login User
  const login = async ({ email, password }) => {
    try {
      //mY ERROR: Didn't write await keyword, so got response of undefined for 2 days.
      const { data: jwt } = await axios.post("http://localhost:5000/api/auth", {
        email,
        password
      });
      console.log(jwt);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: jwt
      });
    } catch (ex) {
      console.log(ex.response.status);

      dispatch({
        type: "LOGIN_FAIL",
        payload: ex.response.data
      });
    }
  };

  //Log out user
  const logout = () => {
    dispatch({
      type: "LOG_OUT"
    });
  };

  //To Show passwords don't match error ??? (is thr any other way?)

  const setError = err => {
    dispatch({
      type: "SET_ERROR",
      payload: err
    });
  };

  // Clear Errors
  const clearError = () => dispatch({ type: "CLEAR_ERROR" });

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        userAuth: state.userAuth,
        error: state.error,
        getUser,
        register,
        login,
        logout,
        setError,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
