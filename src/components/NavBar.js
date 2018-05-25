import React from "react";
import { NavLink } from "react-router-dom";
// import { Menu, Card } from "semantic-ui-react";

const NavBar = props => {
  return (
    <div className="ui huge menu">
      <div className="item" name="login">
        <NavLink to="/login">Login</NavLink>
      </div>
      {props.loggedIn ? (
        <div className="item" name="dashboard">
          <NavLink to="/dashboard">Dashboard</NavLink>
        </div>
      ) : null}
    </div>
  );
};

export default NavBar;
