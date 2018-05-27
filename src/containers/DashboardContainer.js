import React from "react";
import SearchBar from "../components/SearchBar";

class DashboardContainer extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div>
        <SearchBar />
      </div>
    );
  }
}
// <MyCitiesContainer />

export default DashboardContainer;
