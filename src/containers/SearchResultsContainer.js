import React from "react";
import ResultsCityTile from "../components/ResultsCityTile";

class SearchResultsContainer extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className="ui segment">
        {this.props.results.length > 0 ? (
          <div>
            <div>
              <strong>Searched: {this.props.searched}</strong>
              <hr />
            </div>
            {this.props.results.map(city => {
              return (
                <ResultsCityTile
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
              <div>
                <strong>Searched: {this.props.searched}</strong>
                <hr />
              </div>
            ) : null}
            <div>No search results.</div>
          </div>
        )}
      </div>
    );
  }
}

export default SearchResultsContainer;
