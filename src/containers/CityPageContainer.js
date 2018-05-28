import React from "react";
import CityForecastContainer from "./CityForecastContainer";

class CityPageContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      isUserCity: false,
      title: "",
      parent: "",
      woeId: null,
      dbId: null,
      forecast: [],
      allJson: null,
      loaded: false
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3000/convert-woe-plus-parent`, {
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
        console.log("json from API:", json);
        let fiveDayForecast = json.consolidated_weather.slice(1);
        this.setState({
          title: json.title,
          parent: json.parent.title,
          woeId: json.woeid,
          dbId: json.db_id,
          forecast: fiveDayForecast,
          allJson: json
        });
      })
      .then(() => this.setState({ loaded: true }))
      .then(() => this.userCityCheck());
  }

  userCityCheck = () => {
    console.log("state", this.state);
    console.log("currentUser", this.props.currentUser);
    if (this.props.currentUser.id) {
      this.props.currentUser.cities.forEach(city => {
        if (city.woe_id === this.state.woeId) {
          this.setState({
            isUserCity: true
          });
        }
      });
    }
  };

  addCity = () => {
    let city = {
      title: this.state.title,
      parent: this.state.parent,
      woeId: this.state.woeId,
      dbId: this.state.dbId
    };
    this.props.addMyCityHandler(city);
  };

  removeCity = () => {
    let city = {
      title: this.state.title,
      parent: this.state.parent,
      woeId: this.state.woeId,
      dbId: this.state.dbId
    };
    this.props.removeMyCityHandler(city);
  };

  render() {
    return (
      <div>
        {this.props.loggedIn ? (
          this.state.isUserCity ? (
            <button className="ui submit button" onClick={this.removeCity}>
              Remove From My Cities
            </button>
          ) : (
            <button className="ui submit button" onClick={this.addCity}>
              Add To My Cities
            </button>
          )
        ) : null}

        <CityForecastContainer
          cityName={`${this.state.title}, ${this.state.parent}`}
          weatherData={this.state.forecast}
        />

        {this.state.loaded ? (
          <div className="ui segment">
            Current Time:{" "}
            {`${this.state.allJson.time} (${this.state.allJson.timezone_name})`}
            <br />
            Sunrise: {this.state.allJson.sun_rise}
            <br />
            Sunset: {this.state.allJson.sun_set}
          </div>
        ) : null}
      </div>
    );
  }
}

export default CityPageContainer;
