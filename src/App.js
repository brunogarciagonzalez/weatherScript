import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginContainer from "./containers/LoginContainer";
// import DashboardContainer from "./components/DashboardContainer";
// import SearchResultsContainer from "./components/SearchResultsContainer";
// import CityPageContainer from "./components/CityPageContainer";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: true
    };
  }

  handleLogIn = () => {
    this.setState({
      loggedIn: !this.state.loggedIn
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar loggedIn={this.state.loggedIn} />
          <Route exact path="/login" component={LoginContainer} />
        </div>
      </BrowserRouter>
    );
  }
}

// <Route exact path="/dashboard" component={DashboardContainer} />
// <Route
//   exact
//   path="/search-results"
//   component={SearchResultsContainer}
// />
// <Route exact path="/city" component={CityPageContainer} />
export default App;
