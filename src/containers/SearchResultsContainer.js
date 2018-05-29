import React from "react";
import ResultsCityTile from "../components/ResultsCityTile";

class SearchResultsContainer extends React.Component {
  constructor() {
    super();

    this.state = { loaded: false };
  }

  loadedUpdate = () => {
    this.setState({
      loaded: true
    });
  };

  componentDidMount() {
    window.setTimeout(this.loadedUpdate, 500);
  }

  render() {
    return (
      <div>
        {this.state.loaded ? (
          <div className="ui grid">
            <div className="two wide column" />
            <div className="twelve wide column">
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
                    <strong>Searched: {this.props.searched}</strong>
                    <hr />
                    <div>No search results.</div>
                  </div>
                )}
              </div>
            </div>
            <div className="two wide column" />
          </div>
        ) : (
          <div className="ui grid">
            <div className="two wide column" />
            <div className="twelve wide column">
              <div className="ui segment">
                <div className="ui active centered inline loader" />
              </div>
            </div>
            <div className="two wide column" />
          </div>
        )}
      </div>
    );
  }
}

export default SearchResultsContainer;
