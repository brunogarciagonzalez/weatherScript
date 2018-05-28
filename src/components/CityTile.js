import React from "react";
import DayWeatherTile from "./DayWeatherTile";
import { Link } from "react-router-dom";

class CityTile extends React.Component {
  constructor() {
    super();

    this.state = {
      currentDay: "",
      cityName: ""
    };
  }

  componentDidMount() {
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
          <div className="ui link card">
            <div className="image">
              <img
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
              <div className="description">
                Current Temp:{" "}
                {this.celsiusConversion(this.state.currentDay.the_temp)}
                <br />
                Hi / Low:{" "}
                {`${this.celsiusConversion(
                  this.state.currentDay.max_temp
                )} / ${this.celsiusConversion(this.state.currentDay.min_temp)}`}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default CityTile;
