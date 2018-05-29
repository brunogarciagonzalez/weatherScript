import React from "react";
import DayWeatherTile from "../components/DayWeatherTile";

class CityForecastContainer extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  celsiusConversion = num => {
    return parseInt(num * 1.8 + 32, 10);
  };

  render() {
    // console.log("PASSED WEATHER", this.props.weatherData[0]);
    return (
      <div className="ui grid">
        <div className="two wide column" />
        <div className="twelve wide column">
          <div className="ui segment">
            <div className="ui vertically divided grid">
              <div className="three column row">
                <div className="column">
                  {this.props.loggedIn ? (
                    this.props.isUserCity ? (
                      <button
                        className="ui submit button"
                        onClick={this.props.removeCity}
                      >
                        Remove From My Cities
                      </button>
                    ) : (
                      <button
                        className="ui submit button"
                        onClick={this.props.addCity}
                      >
                        Add To My Cities
                      </button>
                    )
                  ) : null}
                </div>
                <div className="column">
                  <div className="ui block header">
                    <h2 style={{ textAlign: "center" }}>
                      {this.props.cityName}
                      <br />
                      {this.props.weatherData.length ? (
                        <div>
                          Current Temp:{" "}
                          {this.celsiusConversion(
                            this.props.weatherData[0].the_temp
                          )}{" "}
                          °F
                        </div>
                      ) : null}
                    </h2>
                  </div>
                </div>
                <div className="column" />
              </div>
              <div className="five column row">
                {this.props.weatherData.map((day, index) => {
                  return (
                    <DayWeatherTile
                      key={day.id}
                      day={day}
                      allJson={this.props.allJson}
                      index={index}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="two wide column" />
      </div>
    );
  }
}

// <Card.Group itemsPerRow={5}>
//   {this.props.weatherData.map(day => {
//     return <DayWeatherTile key={day.id} day={day} />;
//   })}
// </Card.Group>

export default CityForecastContainer;
