import React from "react";
import CityTile from "../components/CityTile";

class SearchResultsContainer extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.results.map(city => {
          return <CityTile key={city.woeid} city={city} />;
        })}
      </div>
    );
  }
}

export default SearchResultsContainer;
