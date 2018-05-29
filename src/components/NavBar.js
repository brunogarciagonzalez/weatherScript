import React from "react";
import { Link } from "react-router-dom";

const NavBar = props => {
  return (
    <div className="ui huge menu">
      {props.loggedIn ? (
        <div
          className="item"
          name="login"
          id="login-nav"
          onClick={props.homeScreen}
        >
          <Link to="/login">Logout</Link>
        </div>
      ) : (
        <div
          className="item"
          name="login"
          id="login-nav"
          onClick={props.homeScreen}
        >
          <Link to="/login">Login</Link>
        </div>
      )}
      {props.loggedIn ? (
        <div className="item" name="dashboard">
          <Link to="/dashboard">Dashboard</Link>
        </div>
      ) : null}
    </div>
  );
};

export default NavBar;
