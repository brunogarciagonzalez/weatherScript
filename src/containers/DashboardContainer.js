import React from "react";
import SearchBar from "../components/SearchBar";
import MyCitiesContainer from "./MyCitiesContainer";
import SearchResultsContainer from "../containers/SearchResultsContainer";

class DashboardContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      searchResults: []
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
      .then(json =>
        this.setState({
          searchResults: json
        })
      );
  };

  render() {
    return (
      <div>
        <SearchBar handleResults={this.handleResults} />
        <SearchResultsContainer results={this.state.searchResults} />
        <MyCitiesContainer currentUser={this.props.currentUser} />
      </div>
    );
  }
}

export default DashboardContainer;
