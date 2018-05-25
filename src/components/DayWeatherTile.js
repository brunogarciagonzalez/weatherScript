import React from "react";
import { Card } from "semantic-ui-react";

// {
//   id: 5549100485312512,
//   weather_state_name: "Heavy Cloud",
//   weather_state_abbr: "hc",
//   wind_direction_compass: "WSW",
//   created: "2018-05-24T17:53:17.260870Z",
//   applicable_date: "2018-05-24",
//   min_temp: 11.552499999999998,
//   max_temp: 14.9175,
//   the_temp: 14.785,
//   wind_speed: 8.686245597528433,
//   wind_direction: 248.87472919066593,
//   air_pressure: 1020.3299999999999,
//   humidity: 77,
//   visibility: 11.981590014316392,
//   predictability: 71
// }

const DayWeatherTile = props => {
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  let celsiusConversion = num => {
    return parseInt(num * 1.8 + 32, 10);
  };

  const {
    applicable_date,
    min_temp,
    max_temp,
    the_temp,
    weather_state_abbr
  } = props.day;

  return (
    <div className="column">
      <div className="ui fluid card">
        <div className="image">
          <img src={require(`../weather_images/${weather_state_abbr}.svg`)} />
        </div>
        <div className="content">
          <div className="header">
            {weekdays[new Date(applicable_date).getDay()]}
          </div>
          <div className="meta">
            <span className="date">{applicable_date}</span>
          </div>
          <div className="description">
            Current Temp: {celsiusConversion(the_temp)}
            <br />
            Hi / Low:{" "}
            {`${celsiusConversion(max_temp)} / ${celsiusConversion(min_temp)}`}
          </div>
        </div>
      </div>
    </div>
  );
};

// <Card>
//   <Card.Content>
//     <Card.Header>
//       {weekdays[new Date(applicable_date).getDay()]}
//     </Card.Header>
//     <Card.Meta>{applicable_date}</Card.Meta>
//     <Card.Description>
//       Current Temp: {celsiusConversion(the_temp)}
//       <br />
//       Hi / Low:{" "}
//       {`${celsiusConversion(max_temp)} / ${celsiusConversion(min_temp)}`}
//     </Card.Description>
//   </Card.Content>
// </Card>

export default DayWeatherTile;
