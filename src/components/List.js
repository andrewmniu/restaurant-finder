import React from "react";
import Location from "./Location.js";
import ListGroup from "react-bootstrap/ListGroup";

const List = ({ locations }) => {
  return (
    <ListGroup>
      {locations.map((location, idx) => {
        const price = location.price_level
          ? "$".repeat(location.price_level)
          : "No Price Data";
        return (
          <Location
            name={location.name}
            price={price}
            rating={location.rating}
            isOpen={location.opening_hours ? location.opening_hours.open_now : true}
            key={idx}
          />
        );
      })}
    </ListGroup>
  );
};

export default List;
