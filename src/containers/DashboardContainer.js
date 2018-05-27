import React from "react";
import SearchBar from "../components/SearchBar";
import MyCitiesContainer from "./MyCitiesContainer";

class DashboardContainer extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div>
        <SearchBar />
        <MyCitiesContainer currentUser={this.props.currentUser} />
      </div>
    );
  }
}

export default DashboardContainer;
