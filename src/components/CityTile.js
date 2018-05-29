import React from "react";
import DayWeatherTile from "./DayWeatherTile";
import { Link } from "react-router-dom";

class CityTile extends React.Component {
  constructor() {
    super();

    this.state = {
      currentDay: "",
      cityName: "",
      showFront: true
    };
  }

  toggleCard = () => {
    this.setState({
      showFront: !this.state.showFront
    });
  };

  componentDidMount() {
    console.log(`CityTile props for ${this.props.city.name}`, this.props);
    fetch(`http://localhost:3000/convert-woe`, {
      method: "POST",
      body: JSON.stringify({
        woeId: this.props.city.woe_id
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          currentDay: json.consolidated_weather[0],
          cityName: json.title
        });
      });
  }

  celsiusConversion = num => {
    return parseInt(num * 1.8 + 32, 10);
  };

  render() {
    return (
      <div className="column">
        {this.state.currentDay ? (
          <div className="ui link card" onClick={this.toggleCard}>
            <div className="image">
              <img
                alt={`current weather visual for ${this.props.city.name}, ${
                  this.props.city.parent
                }`}
                src={require(`../weather_images/${
                  this.state.currentDay.weather_state_abbr
                }.svg`)}
              />
            </div>
            <div className="content">
              <div className="header">{this.state.cityName}</div>
              <div className="meta">
                <span className="date">
                  {new Date(this.state.currentDay.applicable_date)
                    .toDateString()
                    .split(" ")
                    .slice(1)
                    .join(" ")}
                </span>
              </div>

              {this.state.showFront ? (
                <div className="description">
                  <strong>{this.state.currentDay.weather_state_name}</strong>
                  <br />
                  {`(Consensus: ${this.state.currentDay.predictability}%)`}
                  <hr />
                  Current Temp:{" "}
                  {`${this.celsiusConversion(
                    this.state.currentDay.the_temp
                  )} °F`}
                  <br />
                  Hi / Low:{" "}
                  {`${this.celsiusConversion(
                    this.state.currentDay.max_temp
                  )} °F / ${this.celsiusConversion(
                    this.state.currentDay.min_temp
                  )} °F`}
                </div>
              ) : (
                <div className="description">
                  {this.state.currentDay.humidity
                    ? `Humidity: ${this.state.currentDay.humidity}%`
                    : "Humidity: n/a"}
                  <br />
                  {this.state.currentDay.wind_speed
                    ? `Wind: ${this.state.currentDay.wind_speed.toFixed(
                        1
                      )} mph ${this.state.currentDay.wind_direction_compass}`
                    : "Wind: n/a"}
                  <br />
                  {this.state.currentDay.visibility
                    ? `Visibility: ${this.state.currentDay.visibility.toFixed(
                        1
                      )} miles`
                    : "Visibility: n/a"}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default CityTile;
