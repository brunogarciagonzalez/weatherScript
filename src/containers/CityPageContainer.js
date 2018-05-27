import React from "react";
import CityForecastContainer from "./CityForecastContainer";

class CityPageContainer extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>{this.props.woeId}</h1>
        <button>Add City</button>
      </div>
    );
  }
}
// <CityForecastContainer weatherData={} />

export default CityPageContainer;
