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
      forecast: []
    };
  }

  componentDidMount() {
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
        console.log("json", json);
        let fiveDayForecast = json.consolidated_weather.slice(1);
        this.setState({
          title: json.title,
          parent: json.parent.title,
          woeId: json.woeid,
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

  render() {
    return (
      <div>
        {this.state.isUserCity ? (
          <button>Remove From My Cities</button>
        ) : (
          <button>Add To My Cities</button>
        )}
        <CityForecastContainer
          cityName={`${this.state.title}, ${this.state.parent}`}
          weatherData={this.state.forecast}
        />
      </div>
    );
  }
}

export default CityPageContainer;
