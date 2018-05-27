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

  render() {
    // console.log(this.props);
    return (
      <div>
        {this.state.currentDay ? (
          <DayWeatherTile
            cityName={this.state.cityName}
            day={this.state.currentDay}
          />
        ) : null}
      </div>
    );
  }
}

export default CityTile;
