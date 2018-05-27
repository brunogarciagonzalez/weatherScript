import React from "react";

class SearchBar extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className="ui segment">
        <div className="ui icon input fluid">
          <input type="text" placeholder="Search..." />
          <i className="search icon" />
        </div>
      </div>
    );
  }
}

export default SearchBar;
