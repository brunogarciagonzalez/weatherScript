import React from "react";
import DayWeatherTile from "../components/DayWeatherTile";

class CityForecastContainer extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    console.log("allJson:", this.props.allJson);
    return (
      <div>
        <div className="ui block header">{this.props.cityName}</div>
        <div className="ui five column grid">
          {this.props.weatherData.map((day, index) => {
            return <DayWeatherTile key={day.id} day={day} index={index} />;
          })}
        </div>
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
