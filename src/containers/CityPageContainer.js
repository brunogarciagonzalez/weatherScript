import React from "react";
import CityForecastContainer from "./CityForecastContainer";

class CityPageContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      title: "",
      parent: "",
      forecast: []
    };
  }

  componentWillMount() {
    // using this.props.woeId, fetch weather info
    fetch(`http://localhost:3000/convert-woe`, {
      method: "POST",
      body: JSON.stringify({
        woeId: this.props.woeId
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(r => r.json())
      .then(json => {
        let fiveDayForecast = json.consolidated_weather.slice(1);
        this.setState({
          title: json.title,
          parent: json.parent.title,
          forecast: fiveDayForecast
        });
      });
  }

  render() {
    return (
      <div>
        <button>Add City</button>
        <CityForecastContainer
          cityName={`${this.state.title}, ${this.state.parent}`}
          weatherData={this.state.forecast}
        />
      </div>
    );
  }
}

export default CityPageContainer;
