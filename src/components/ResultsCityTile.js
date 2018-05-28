import React from "react";
// import { Link } from "react-router-dom";

class ResultsCityTile extends React.Component {
  constructor() {
    super();

    this.state = {
      hover: false
    };
  }

  toggleHover = () => {
    this.setState({
      hover: !this.state.hover
    });
  };

  handleClick = () => {
    this.props.setCityWoeId(this.props.city.woeid, this.props.city.title);
  };

  render() {
    return (
      <div
        style={{ cursor: "default" }}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        onClick={this.handleClick}
      >
        <span style={this.state.hover ? { color: "red" } : { color: "black" }}>
          {this.props.city.title}
        </span>
      </div>
    );
  }
}

export default ResultsCityTile;
