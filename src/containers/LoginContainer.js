import React from "react";
import LoginForm from "../components/LoginForm";
import CityForecastContainer from "./CityForecastContainer";

class LoginContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      randomCityName: null,
      randomCities: [
        "San Francisco",
        "New York",
        "London",
        "Sydney",
        "Washington DC"
      ],
      weatherData: [],
      loaded: false
    };
  }

  componentDidMount() {
    let num = Math.floor(Math.random() * this.state.randomCities.length);
    let cityName = this.state.randomCities[num];
    fetch(`http://localhost:3000/woe-id-random-city`, {
      method: "POST",
      body: JSON.stringify({
        city: cityName
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json =>
        this.setState({
          randomCityName: `${json.title}, ${json.parent.title}`,
          weatherData: json.consolidated_weather.slice(0, 5),
          loaded: true
        })
      );
  }

  render() {
    return (
      <div>
        <LoginForm
          newUser={this.props.newUser}
          homeScreen={this.props.homeScreen}
          createUser={this.props.createUser}
          handleLogIn={this.props.handleLogIn}
        />
        {this.state.loaded ? (
          <CityForecastContainer
            cityName={this.state.randomCityName}
            weatherData={this.state.weatherData}
            currentWeather={this.state.weatherData[0]}
          />
        ) : (
          <div style={{ paddingTop: "100px" }}>
            <div className="ui inverted active centered inline loader" />
          </div>
        )}
      </div>
    );
  }
}

export default LoginContainer;
