import React from "react";
import LoginForm from "../components/LoginForm";
import CityForecastContainer from "./CityForecastContainer";

class LoginContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      randomCities: [
        "San Francisco",
        "New York",
        "London",
        "Sydney",
        "Washington DC"
      ],
      weatherData: []
    };

    //this state should hold tem woeIds to fetch for main page
  }

  componentDidMount() {
    let num = Math.floor(Math.random() * this.state.randomCities.length);
    let cityName = this.state.randomCities[num];
    fetch(`http://localhost:3000/woe-id`, {
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
          randomCityName: json.title,
          weatherData: json.consolidated_weather.slice(0, 5)
        })
      );
  }

  // getForecast = json => {
  //   fetch(`http://localhost:3000/weather`)
  //     .then(res => res.json())
  //     .then(json =>
  //       this.setState({
  //         randomCityName: json.title,
  //         weatherData: json.consolidated_weather.slice(0, 5)
  //       })
  //     );
  // };

  render() {
    console.log(this.props);
    return (
      <div>
        <LoginForm
          newUser={this.props.newUser}
          createUser={this.props.createUser}
          handleLogIn={this.props.handleLogIn}
        />
        <CityForecastContainer
          randomCityName={this.state.randomCityName}
          weatherData={this.state.weatherData}
        />
      </div>
    );
  }
}

export default LoginContainer;
