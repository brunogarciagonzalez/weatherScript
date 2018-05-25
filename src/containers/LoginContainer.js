import React from "react";
import LoginForm from "../components/LoginForm";
import CityForecastContainer from "./CityForecastContainer";

const weatherData = [
  {
    id: 5549100485312512,
    weather_state_name: "Heavy Cloud",
    weather_state_abbr: "hc",
    wind_direction_compass: "WSW",
    created: "2018-05-24T17:53:17.260870Z",
    applicable_date: "2018-05-24",
    min_temp: 11.552499999999998,
    max_temp: 14.9175,
    the_temp: 14.785,
    wind_speed: 8.686245597528433,
    wind_direction: 248.87472919066593,
    air_pressure: 1020.3299999999999,
    humidity: 77,
    visibility: 11.981590014316392,
    predictability: 71
  },
  {
    id: 6094149015044096,
    weather_state_name: "Showers",
    weather_state_abbr: "s",
    wind_direction_compass: "SSW",
    created: "2018-05-24T17:53:20.159720Z",
    applicable_date: "2018-05-25",
    min_temp: 10.817499999999999,
    max_temp: 14.9,
    the_temp: 14.355,
    wind_speed: 6.974424998799014,
    wind_direction: 210.8733838645403,
    air_pressure: 1022.585,
    humidity: 85,
    visibility: 10.040426409766962,
    predictability: 73
  },
  {
    id: 4977162775953408,
    weather_state_name: "Light Cloud",
    weather_state_abbr: "lc",
    wind_direction_compass: "W",
    created: "2018-05-24T17:53:23.261380Z",
    applicable_date: "2018-05-26",
    min_temp: 10.295,
    max_temp: 15.53,
    the_temp: 16.7,
    wind_speed: 9.550460122158594,
    wind_direction: 272.3088527456737,
    air_pressure: 1020.0899999999999,
    humidity: 76,
    visibility: 14.386296528274874,
    predictability: 70
  },
  {
    id: 6736646594625536,
    weather_state_name: "Light Cloud",
    weather_state_abbr: "lc",
    wind_direction_compass: "W",
    created: "2018-05-24T17:53:25.570360Z",
    applicable_date: "2018-05-27",
    min_temp: 10.2875,
    max_temp: 20.0225,
    the_temp: 21.485,
    wind_speed: 7.179321318138074,
    wind_direction: 263.88032988551214,
    air_pressure: 1013.855,
    humidity: 69,
    visibility: 12.668205181738646,
    predictability: 70
  },
  {
    id: 5245424285777920,
    weather_state_name: "Clear",
    weather_state_abbr: "c",
    wind_direction_compass: "W",
    created: "2018-05-24T17:53:29.265210Z",
    applicable_date: "2018-05-28",
    min_temp: 13.0675,
    max_temp: 22.3525,
    the_temp: 24.62,
    wind_speed: 6.44670519690408,
    wind_direction: 259.12835571270705,
    air_pressure: 1011.86,
    humidity: 64,
    visibility: 16.050639266682573,
    predictability: 68
  }
];

class LoginContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      randomCities: [2487956, 2459115, 44418, 1105779, 2514815],
      weatherData: weatherData
    };

    //this state should hold tem woeIds to fetch for main page
  }

  // randomWoeId = () => {
  //   let num = Math.floor(Math.random() * this.state.randomCities.length);
  //   return this.state.randomCities[num];
  // };
  //
  // componentDidMount() {
  //   fetch(`https://www.metaweather.com/api/location/${this.randomWoeId()}/`)
  //     .then(res => res.json())
  //     .then(json => console.log(json));
  // }

  render() {
    return (
      <div>
        <LoginForm />
        <CityForecastContainer weatherData={this.state.weatherData} />
      </div>
    );
  }
}

export default LoginContainer;
