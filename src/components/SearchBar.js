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
    if (e.key === "Enter" && this.state.searchTerm !== "") {
      this.props.resultsShowHandler();
      this.props.handleResults(this.state.searchTerm);

      this.setState({
        searchTerm: ""
      });
    }
  };

  render() {
    return (
      <div className="ui grid">
        <div className="four wide column" />
        <div className="eight wide column">
          <div className="ui huge category search">
            <div className="ui icon input fluid">
              <input
                type="text"
                className="prompt"
                placeholder="Search City..."
                onKeyPress={this.submitHandler}
                onChange={this.inputHandler}
                value={this.state.searchTerm}
              />
              <i className="search icon" />
            </div>
          </div>
        </div>
        <div className="four wide column" />
      </div>
    );
  }
}

export default SearchBar;
