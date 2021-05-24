import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

const Location = ({ name, rating, price, isOpen }) => {
  return (
    <ListGroup.Item>
      <h4>{name}</h4>
      <p className={`m-0 font-weight-bold ${isOpen ? "text-success" : "text-danger"}`}>{isOpen ? "Open" : "Closed"}</p>
      <p className="m-0">
        <span className="font-weight-bold">Price:</span> {price}
      </p>
      <p className="m-0">
        <span className="font-weight-bold">Rating:</span> {rating}/5.0
      </p>
    </ListGroup.Item>
  );
};

export default Location;
