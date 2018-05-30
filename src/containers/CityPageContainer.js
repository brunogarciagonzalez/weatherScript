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
      loaded: false,
      rest_id: null
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
        // console.log("json from API:", json);
        let fiveDayForecast = json.consolidated_weather.slice(0, 5);
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
      .then(() => this.userCityCheck())
      .then(() => this.fetchRestaurants());
  }

  fetchRestaurants = () => {
    fetch(
      `https://developers.zomato.com/api/v2.1/cities?q=${this.state.title}`,
      {
        headers: {
          Accept: "application/json",
          "user-key": "d599a15ba796f87ea71e3398cc1f06bf"
        }
      }
    )
      .then(res => res.json())
      .then(json => {
        if (json.location_suggestions.length) {
          this.setState({
            rest_id: json.location_suggestions[0].id
          });
        } else {
          console.log(json);
        }
      });
  };

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
      <div className={this.state.rest_id ? "ui grid" : null}>
        <div className="one wide column" />
        <div className="two wide column">
          {!!this.state.rest_id ? (
            <div className="widget_wrap">
              <iframe
                src={`https://www.zomato.com/widgets/res_search_widget.php?city_id=${
                  this.state.rest_id
                }&theme=red&hideCitySearch=on&hideResSearch=on&sort=popularity`}
                border="0"
                frameBorder="0"
                style={{ height: 600 }}
              />
            </div>
          ) : null}
        </div>
        <div className="thirteen wide column">
          {this.state.loaded ? (
            <div>
              <CityForecastContainer
                cityName={`${this.state.title}, ${this.state.parent}`}
                weatherData={this.state.forecast}
                loggedIn={this.props.loggedIn}
                isUserCity={this.state.isUserCity}
                removeCity={this.removeCity}
                addCity={this.addCity}
              />
            </div>
          ) : (
            <div style={{ paddingTop: "100px" }}>
              <div className="ui inverted active centered inline loader" />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CityPageContainer;
