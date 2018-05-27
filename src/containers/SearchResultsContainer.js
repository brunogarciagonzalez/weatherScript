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
        {this.props.results.length > 0 ? (
          <div>
            <div>Searched: {this.props.searched}</div>
            {this.props.results.map(city => {
              return (
                <CityTile
                  setCityWoeId={this.props.setCityWoeId}
                  key={city.woeid}
                  city={city}
                />
              );
            })}
          </div>
        ) : (
          <div>
            {this.props.searched !== "" ? (
              <div>Searched: {this.props.searched}</div>
            ) : null}
            <div>No search results.</div>
          </div>
        )}
      </div>
    );
  }
}

export default SearchResultsContainer;
