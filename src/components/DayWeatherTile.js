import React from "react";

class DayWeatherTile extends React.Component {
  constructor() {
    super();

    this.state = {
      showFront: true
    };
  }

  toggleCard = () => {
    this.setState({
      showFront: !this.state.showFront
    });
  };

  weekdays = () => {
    return [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];
  };

  celsiusConversion = num => {
    return parseInt(num * 1.8 + 32, 10);
  };

  render() {
    console.log("HERE", this.props.day);
    return (
      <div className="column">
        <div
          className="ui fluid card"
          onMouseEnter={this.toggleCard}
          onMouseLeave={this.toggleCard}
        >
          <div className="image">
            <img
              alt={`${this.props.day.weather_state_name} weather`}
              src={require(`../weather_images/${
                this.props.day.weather_state_abbr
              }.svg`)}
            />
          </div>
          <div className="content">
            <div className="header">
              {
                this.weekdays()[
                  new Date(this.props.day.applicable_date).getDay()
                ]
              }
            </div>
            <div className="meta">
              <span className="date">
                {new Date(this.props.day.applicable_date)
                  .toDateString()
                  .split(" ")
                  .slice(1)
                  .join(" ")}
              </span>
            </div>

            {this.state.showFront ? (
              <div className="description">
                <strong>{this.props.day.weather_state_name}</strong>
                <br />
                {`(Consensus: ${this.props.day.predictability}%)`}
                <hr />
                {this.props.index === 0 ? (
                  <span>
                    Current Temp:{" "}
                    {this.celsiusConversion(this.props.day.the_temp)} °F
                    <br />
                  </span>
                ) : null}
                Hi / Low:{" "}
                {`${this.celsiusConversion(
                  this.props.day.max_temp
                )} °F / ${this.celsiusConversion(this.props.day.min_temp)} °F`}
              </div>
            ) : (
              <div className="description">
                {this.props.day.humidity
                  ? `Humidity: ${this.props.day.humidity}%`
                  : "Humidity: n/a"}
                <br />
                {this.props.day.wind_speed
                  ? `Wind: ${this.props.day.wind_speed.toFixed(1)} mph ${
                      this.props.day.wind_direction_compass
                    }`
                  : "Wind: n/a"}
                <br />
                {this.props.day.visibility
                  ? `Visibility: ${this.props.day.visibility.toFixed(1)} miles`
                  : "Visibility: n/a"}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default DayWeatherTile;
