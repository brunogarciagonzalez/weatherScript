import React from "react";

const CityTile = props => {
  let { title } = props.city;

  return <div>{title}</div>;
};

export default CityTile;
