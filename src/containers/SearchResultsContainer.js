import React from "react";
import ResultsCityTile from "../components/ResultsCityTile";

class SearchResultsContainer extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.results.map(city => {
          return <ResultsCityTile key={city.woeid} city={city} />;
        })}
      </div>
    );
  }
}

export default SearchResultsContainer;
