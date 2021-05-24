import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Input = ({
  center,
  locationType,
  onChange,
  onSubmit,
  onClick,
  sortBy,
}) => {
  return (
    <Form className="mt-2 p-3 border rounded border-dark"onSubmit={onSubmit}>
      <Form.Label
        style={{ textTransform: "capitalize" }}
      >{`Find ${locationType}s Near:`}</Form.Label>
      <Form.Group>
        <input
          className="form-control"
          type="text"
          value={center}
          placeholder="City, Address, or Zip"
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="mb-0">Location Type:</Form.Label>
        <Form.Check
          type="radio"
          name="location-type"
          label="Restaurants"
          id="restaurant"
          onChange={onClick}
          defaultChecked
        />
        <Form.Check
          type="radio"
          name="location-type"
          label="Bars"
          id="bar"
          onChange={onClick}
        />
        <Form.Check
          type="radio"
          name="location-type"
          label="Cafes"
          id="cafe"
          onChange={onClick}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Search
      </Button>
      <Form.Group className="mb-0">
        <Form.Label className="mb-0 mt-2">Sort By:</Form.Label>
        <Form.Check
          type="radio"
          name="sort"
          label="Rating"
          id="rating"
          onChange={sortBy}
        />
        <Form.Check
          type="radio"
          name="sort"
          label="Price"
          id="price_level"
          onChange={sortBy}
        />
      </Form.Group>
    </Form>
  );
};

export default Input;
