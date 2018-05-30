import React from "react";
import SearchBar from "../components/SearchBar";
import MyCitiesContainer from "./MyCitiesContainer";
import SearchResultsContainer from "../containers/SearchResultsContainer";

class DashboardContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      searchResults: [],
      lastSearchTerm: "",
      searched: false,
      loaded: false
    };
  }

  handleResults = searchTerm => {
    // submit form to backend via fetch POST
    fetch("http://localhost:3000/woe-id", {
      method: "POST",
      body: JSON.stringify({
        city: searchTerm
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          searchResults: json,
          lastSearchTerm: searchTerm
        });
        return json;
      });
    // .then(json => {
    //   // if json is object (not array) or if the length of the array is 1
    //   if (Array.isArray(json)) {
    //     // if one only
    //     if (json.length === 1) {
    //       // call this.props.setCityWoeId
    //       this.props.setCityWoeId(json[0].woeid, json[0].title);
    //     } else {
    //       // could be none:
    //       if (json.length === 0) {
    //         console.log("no results", json);
    //       } else {
    //         console.log("multiple", json);
    //       }
    //     }
    //   } else {
    //     // only other possiblity is that the actual weather data gets sent here
    //     // because city was matched in our db so it took another route in the
    //     // backend
    //     console.log("only one, in db", json);
    //     this.props.setCityWoeId(json.woeid, json.title);
    //   }
    // });
  };

  resultsShowHandler = () => {
    this.setState({
      searched: true
    });
  };

  componentDidMount() {
    window.setTimeout(() => {
      this.setState({ loaded: true });
    }, 3000);
  }

  render() {
    return (
      <div>
        <SearchBar
          resultsShowHandler={this.resultsShowHandler}
          handleResults={this.handleResults}
        />
        {this.state.searched ? (
          <SearchResultsContainer
            setCityWoeId={this.props.setCityWoeId}
            searched={this.state.lastSearchTerm}
            results={this.state.searchResults}
          />
        ) : null}
        {this.props.loggedIn ? (
          <MyCitiesContainer
            load={this.state.loaded}
            setCityWoeId={this.props.setCityWoeId}
            currentUser={this.props.currentUser}
          />
        ) : null}
      </div>
    );
  }
}

export default DashboardContainer;
