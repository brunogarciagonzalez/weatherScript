import React from "react";
import SearchBar from "../components/SearchBar";
import SearchResultsContainer from "../containers/SearchResultsContainer";

class DashboardContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      searchResults: [],
      lastSearchTerm: ""
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
          searchResults: json,
          lastSearchTerm: searchTerm
        })
      );
  };

  render() {
    return (
      <div>
        <SearchBar handleResults={this.handleResults} />
        <SearchResultsContainer
          setCityWoeId={this.props.setCityWoeId}
          searched={this.state.lastSearchTerm}
          results={this.state.searchResults}
        />
      </div>
    );
  }
}
// <MyCitiesContainer />

export default DashboardContainer;
