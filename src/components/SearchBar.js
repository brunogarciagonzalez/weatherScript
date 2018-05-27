import React from "react";

class SearchBar extends React.Component {
  constructor() {
    super();

    this.state = {
      searchTerm: ""
    };
  }

  inputHandler = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  submitHandler = e => {
    if (e.key === "Enter") {
      this.props.handleResults(this.state.searchTerm);

      this.setState({
        searchTerm: ""
      });
    }
  };

  render() {
    return (
      <div className="ui segment">
        <div className="ui icon input fluid">
          <input
            type="text"
            placeholder="Find City..."
            onKeyPress={this.submitHandler}
            onChange={this.inputHandler}
            value={this.state.searchTerm}
          />
          <i className="search icon" />
        </div>
      </div>
    );
  }
}

export default SearchBar;
