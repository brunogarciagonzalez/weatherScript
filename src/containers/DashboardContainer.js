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
        {this.props.loggedIn && this.props.currentUser.cities.length > 0 ? (
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
