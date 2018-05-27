import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginContainer from "./containers/LoginContainer";
import DashboardContainer from "./containers/DashboardContainer";
// import SearchResultsContainer from "./components/SearchResultsContainer";
// import CityPageContainer from "./components/CityPageContainer";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      newUser: false,
      currentUser: {}
    };
  }

  createUser = () => {
    this.setState({
      newUser: !this.state.newUser
    });
  };

  handleLogIn = user => {
    this.setState({
      loggedIn: !this.state.loggedIn,
      currentUser: user
    });
  };

  render() {
    console.log(this.state.currentUser);
    return (
      <BrowserRouter>
        <div>
          <NavBar createUser={this.createUser} loggedIn={this.state.loggedIn} />
          {this.state.loggedIn ? null : (
            <Route
              exact
              path="/login"
              render={() => (
                <LoginContainer
                  newUser={this.state.newUser}
                  createUser={this.createUser}
                  handleLogIn={this.handleLogIn}
                />
              )}
            />
          )}
          <Route exact path="/dashboard" component={DashboardContainer} />
        </div>
      </BrowserRouter>
    );
  }
}

// <Route
//   exact
//   path="/search-results"
//   component={SearchResultsContainer}
// />
// <Route exact path="/city" component={CityPageContainer} />
export default App;
