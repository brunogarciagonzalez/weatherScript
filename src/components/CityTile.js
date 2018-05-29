import React from "react";
import DayWeatherTile from "./DayWeatherTile";
import { Link } from "react-router-dom";

class CityTile extends React.Component {
  constructor() {
    super();

    this.state = {
      currentDay: "",
      cityName: "",
      showFront: true,
      loaded: false
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
          cityName: json.title,
          loaded: true
        });
      });
  }

  celsiusConversion = num => {
    return parseInt(num * 1.8 + 32, 10);
  };

  render() {
    return (
      <div className="column">
        {this.state.loaded ? (
          <div className="column">
            {this.state.currentDay ? (
              <div
                className="ui fluid card"
                onMouseEnter={this.toggleCard}
                onMouseLeave={this.toggleCard}
                onClick={() =>
                  this.props.setCityWoeId(
                    this.props.city.woe_id,
                    this.props.city.name
                  )
                }
              >
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
                      <strong>
                        {this.state.currentDay.weather_state_name}
                      </strong>
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
                          )} mph ${
                            this.state.currentDay.wind_direction_compass
                          }`
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
        ) : (
          <div style={{ "padding-top": "100px" }}>
            <div className="ui inverted active centered inline loader" />
          </div>
        )}
      </div>
    );
  }
}
// <div className="ui segment">
//   <div className="ui active centered inline loader" />
// </div>

export default CityTile;
