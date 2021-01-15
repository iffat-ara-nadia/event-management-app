import React from "react";
import { Route, Switch } from "react-router-dom";
import GuestState from "./context/guestContext/GuestState";
import AuthState from "./context/authContext/AuthState";
import NavBar from "./components/layouts/NavBar";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import PrivateRoute from "../src/components/pages/routes/PrivateRoute";
import setToken from "./services/authService";
import "./App.css";

if (localStorage.token) {
  setToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <GuestState>
        <div>
          <NavBar />
          <Switch>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
            <PrivateRoute path="/" exact component={Home} />
          </Switch>
        </div>
      </GuestState>
    </AuthState>
  );
}

export default App;
