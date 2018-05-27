import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginContainer from "./containers/LoginContainer";
import DashboardContainer from "./containers/DashboardContainer";
// import SearchResultsContainer from "./components/SearchResultsContainer";
import CityPageContainer from "./containers/CityPageContainer";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      newUser: false,
      currentUser: {},
      cityWoeIds: []
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

  setCityWoeId = (woeId, city) => {
    let copy = [...this.state.cityWoeIds];
    copy.push(woeId);
    this.setState(
      {
        cityWoeIds: copy
      },
      () => {
        // go to window newest state
        // not sure how else to do this other than to pushState twice and ask window to go back once
        window.history.pushState(
          {
            title: `WeatherScript: ${city}`,
            relative_url: `/cities/${woeId}`
          },
          `WeatherScript: ${city}`,
          `/cities/${woeId}`
        );

        window.history.pushState(
          {
            title: `WeatherScript: ${city}`,
            relative_url: `/cities/${woeId}`
          },
          `WeatherScript: ${city}`,
          `/cities/${woeId}`
        );

        window.history.back();
      }
    );
  };

  render() {
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
          <Route
            exact
            path="/dashboard"
            render={() => (
              <DashboardContainer currentUser={this.state.currentUser} setCityWoeId={this.setCityWoeId} />
            )}
          />

          {this.state.cityWoeIds.map(woeid => {
            console.log("route present for: ", woeid);
            return (
              <Route
                key={woeid}
                exact
                path={`/cities/${woeid}`}
                render={() => <CityPageContainer woeId={woeid} />}
              />
            );
          })}
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
