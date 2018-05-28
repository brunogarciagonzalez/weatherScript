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
      forecast: []
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
        console.log("json", json);
        let fiveDayForecast = json.consolidated_weather.slice(1);
        this.setState({
          title: json.title,
          parent: json.parent.title,
          woeId: json.woeid,
          dbId: json.db_id,
          forecast: fiveDayForecast
        });
      })
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
    // takes in the city
    let city = {
      title: this.state.title,
      parent: this.state.parent,
      woeId: this.state.woeId,
      dbId: this.state.dbId
    };
    this.props.addMyCityHandler(city);
  };

  removeCity = () => {
    // takes in the city
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
            <button onClick={this.removeCity}>Remove From My Cities</button>
          ) : (
            <button onClick={this.addCity}>Add To My Cities</button>
          )
        ) : null}

        <CityForecastContainer
          cityName={`${this.state.title}, ${this.state.parent}`}
          weatherData={this.state.forecast}
        />
      </div>
    );
  }
}

export default CityPageContainer;
