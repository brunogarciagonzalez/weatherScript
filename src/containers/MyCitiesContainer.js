import React from "react";
import CityTile from "../components/CityTile";

class MyCitiesContainer extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { currentUser } = this.props;
    // console.log(!!currentUser.cities);
    return (
      <div className="ui two column grid">
        {!!currentUser.cities
          ? currentUser.cities.map(city => {
              return <CityTile key={city.id} city={city} />;
            })
          : null}
      </div>
    );
  }
}

export default MyCitiesContainer;
