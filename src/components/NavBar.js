import React from "react";
import { Link } from "react-router-dom";

const NavBar = props => {
  return (
    <div className="ui massive menu">
      <div className="item">
        <h3>WeatherScript™</h3>
      </div>
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
      {props.loggedIn ? null : (
        <div className="item" name="search">
          <Link to="/dashboard">Search</Link>
        </div>
      )}
      {props.loggedIn ? (
        <div className="item" name="dashboard">
          <Link to="/dashboard">
            {props.currentUser.first_name}
            {"'s Dashboard"}
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default NavBar;
