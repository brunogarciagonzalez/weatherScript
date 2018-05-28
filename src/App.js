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

  homeScreen = () => {
    this.setState({
      loggedIn: false,
      newUser: false,
      currentUser: {}
    });
  };

  createUser = () => {
    this.setState({
      newUser: true
    });
  };

  handleLogIn = user => {
    this.setState(
      {
        loggedIn: !this.state.loggedIn,
        currentUser: user
      },
      () =>
        console.log("state.currentUser (after login):", this.state.currentUser)
    );
  };

  setCityWoeId = (woeId, city) => {
    let copy = [...this.state.cityWoeIds];

    if (!copy.includes(woeId)) {
      copy.push(woeId);
    }

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

  addMyCityHandler = city => {
    // this function is only reachable if user logged in and this city is not already a MyCity

    // optimistic rendering
    // edit state.currentUser.cities
    // redirect to dashboard
    let c = [...this.state.currentUser.cities];
    // how a city looks in currentUser.cities: {id: 46, name: "London", parent: "England", woe_id: 44418}

    c.push({
      id: city.dbId,
      name: city.title,
      parent: city.parent,
      woe_id: city.woeId
    });

    this.setState(
      {
        currentUser: {
          ...this.state.currentUser,
          cities: c
        }
      },
      () =>
        console.log(
          "state.currentUser check (optimistic render after add City):",
          this.state.currentUser
        )
    );

    // need to fetch post, sending currentUserId and dbId
    // to user-cities controller
    fetch("http://localhost:3000/add-city", {
      method: "POST",
      body: JSON.stringify({
        city_id: city.dbId,
        user_id: this.state.currentUser.id
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(r => r.json())
      .then(json => {
        console.log(
          "state.currentUser check (db persistence after add City):",
          json
        );
        return json;
      })
      .then(json => {
        // redirect to dashboard:
        window.history.pushState(
          {
            title: `WeatherScript: User Dashboard`,
            relative_url: `/dashboard`
          },
          `WeatherScript: User Dashboard`,
          `/dashboard`
        );

        window.history.pushState(
          {
            title: `WeatherScript: User Dashboard`,
            relative_url: `/dashboard`
          },
          `WeatherScript: User Dashboard`,
          `/dashboard`
        );

        window.history.back();
      });
  };

  removeMyCityHandler = city => {
    // this function is only reachable if user logged in and this city is already a MyCity

    // optimistic rendering
    // edit state.currentUser.cities
    // redirect to dashboard

    let c = [...this.state.currentUser.cities];
    // how a city looks in currentUser.cities: {id: 46, name: "London", parent: "England", woe_id: 44418}

    let d = c.filter(cty => {
      return cty.id !== city.dbId;
    });

    this.setState({
      currentUser: {
        ...this.state.currentUser,
        cities: d
      }
    });

    // need to fetch post, sending currentUserId and dbId
    // to user-cities controller

    fetch("http://localhost:3000/remove-city", {
      method: "POST",
      body: JSON.stringify({
        city_id: city.dbId,
        user_id: this.state.currentUser.id
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(r => r.json())
      .then(json => {
        console.log("removeCityHandler json:", json);
        return json;
      })
      .then(json => {
        // redirect to dashboard:
        window.history.pushState(
          {
            title: `WeatherScript: User Dashboard`,
            relative_url: `/dashboard`
          },
          `WeatherScript: User Dashboard`,
          `/dashboard`
        );

        window.history.pushState(
          {
            title: `WeatherScript: User Dashboard`,
            relative_url: `/dashboard`
          },
          `WeatherScript: User Dashboard`,
          `/dashboard`
        );

        window.history.back();
      });
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar homeScreen={this.homeScreen} loggedIn={this.state.loggedIn} />
          {this.state.loggedIn ? null : (
            <Route
              exact
              path="/login"
              render={() => (
                <LoginContainer
                  newUser={this.state.newUser}
                  homeScreen={this.homeScreen}
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
              <DashboardContainer
                currentUser={this.state.currentUser}
                setCityWoeId={this.setCityWoeId}
              />
            )}
          />

          {this.state.cityWoeIds.map(woeid => {
            return (
              <Route
                key={woeid}
                exact
                path={`/cities/${woeid}`}
                render={() => (
                  <CityPageContainer
                    woeId={woeid}
                    currentUser={this.state.currentUser}
                    loggedIn={this.state.loggedIn}
                    addMyCityHandler={this.addMyCityHandler}
                    removeMyCityHandler={this.removeMyCityHandler}
                  />
                )}
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
