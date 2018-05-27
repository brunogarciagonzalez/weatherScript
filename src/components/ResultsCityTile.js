import React from "react";
// import { Link } from "react-router-dom";

class ResultsCityTile extends React.Component {
  handleClick = () => {
    this.props.setCityWoeId(this.props.city.woeid, this.props.city.title);
  };

  render() {
    return <div onClick={this.handleClick}>{this.props.city.title}</div>;
  }
}

export default ResultsCityTile;
