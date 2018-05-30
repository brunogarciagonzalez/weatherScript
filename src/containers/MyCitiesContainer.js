import React from "react";
import CityTile from "../components/CityTile";

class MyCitiesContainer extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { currentUser, setCityWoeId } = this.props;
    return (
      <div>
        <div
          className="ui grid"
          style={this.props.load ? { display: "inline" } : { display: "none" }}
        >
          <div className="two wide column" />
          <div className="twelve wide column">
            <div className="ui segment">
              <div className="ui vertically divided grid">
                <div className="three column row">
                  <div className="column" />
                  <div className="column">
                    <div className="ui segment">
                      <h1 style={{ textAlign: "center" }}>My Cities</h1>
                    </div>
                  </div>
                  <div className="column" />
                </div>
                <div className="five column row">
                  {!!currentUser.cities
                    ? currentUser.cities.map(city => {
                        return (
                          <CityTile
                            key={city.id}
                            city={city}
                            setCityWoeId={setCityWoeId}
                          />
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
          </div>
          <div className="two wide column" />
        </div>
        <div
          style={
            this.props.load
              ? { display: "none" }
              : { display: "block", marginTop: "300px" }
          }
        >
          <div className="ui inverted active centered inline loader" />
        </div>
      </div>
    );
  }
}

export default MyCitiesContainer;
