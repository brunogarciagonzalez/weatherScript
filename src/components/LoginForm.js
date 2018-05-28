import React from "react";
import { Link } from "react-router-dom";

class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  saveUser = () => {
    fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify({
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        username: this.state.username,
        password: this.state.password
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => this.props.handleLogIn(json));
  };

  loginUser = () => {
    fetch("http://localhost:3000/login-user", {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => this.props.handleLogIn(json));
  };

  render() {
    // console.log(this.props);
    return this.props.newUser ? (
      <div className="ui two column centered grid">
        <div className="ui raised segment">
          <div className="ui large form">
            <div className="two fields">
              <div className="field">
                <input
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <input
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <input
                placeholder="Username"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <input
                placeholder="Password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <Link
              className="ui submit button"
              to="/dashboard"
              onClick={this.saveUser}
            >
              Sign Up!
            </Link>
          </div>
          <a onClick={this.props.homeScreen}>Log In</a>
        </div>
      </div>
    ) : (
      <div className="ui two column centered grid">
        <div className="ui raised segment">
          <div className="ui large form">
            <div className="two fields">
              <div className="field">
                <input
                  placeholder="Username"
                  value={this.state.username}
                  name="username"
                  onChange={this.handleChange}
                  type="text"
                />
              </div>
              <div className="field">
                <input
                  placeholder="Password"
                  value={this.state.password}
                  name="password"
                  onChange={this.handleChange}
                  type="password"
                />
              </div>
            </div>
            <Link
              to="/dashboard"
              className="ui submit button"
              onClick={this.loginUser}
            >
              Sign In
            </Link>
          </div>
          <a onClick={this.props.createUser}>New Account</a>
        </div>
      </div>
    );
  }
}

// <Card raised centered>
//   <Form size={"big"}>
//     <Form.Group widths="equal">
//       <Form.Field control="input" placeholder="Username" />
//     </Form.Group>
//     <Form.Group widths="equal">
//       <Form.Field
//         control="input"
//         type="password"
//         placeholder="Password"
//       />
//     </Form.Group>
//     <Button fluid type="submit">
//       Login
//     </Button>
//   </Form>
// </Card>

export default LoginForm;
