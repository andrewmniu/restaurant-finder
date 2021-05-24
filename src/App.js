import "./App.css";
import { useState, useEffect } from "react";
import Input from "./components/Input.js";
import List from "./components/List.js";
import RestaurantMap from "./components/Map.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [locations, setLocations] = useState([]);
  const [center, setCenter] = useState("Charlottesville");
  const [coordinates, setCoordinates] = useState([38.0293, -78.4767]);
  const [locationType, setLocationType] = useState("restaurant");

  useEffect(() => {
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    const centerCoordinates = await getCoordinates(center);
    const url = new URL(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
    );
    url.searchParams.append("key", API_KEY);
    url.searchParams.append("location", centerCoordinates);
    url.searchParams.append("radius", "5000");
    url.searchParams.append("type", locationType);
    return fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLocations(data.results);
        setCoordinates(centerCoordinates);
      });
  };

  const getCoordinates = (center) => {
    const centerString = encodeURIComponent(center);
    const url = new URL(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${centerString}.json`
    );
    url.searchParams.append("limit", 1);
    url.searchParams.append(
      "access_token",
      "pk.eyJ1IjoiYW5kcmV3bml1IiwiYSI6ImNrbm56ZHpxNjEzOHMydXA4aGdkZ3B3eXIifQ.Z88u0kVU0H8RCmLIgoUjXg"
    );
    return fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return [data.features[0].center[1], data.features[0].center[0]];
      });
  };

  const onChange = (e) => {
    setCenter(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    document.getElementById("rating").checked = false
    document.getElementById("price_level").checked = false
    getRestaurants();
  };

  const onClick = async (e) => {
    setLocationType(e.target.id);
  };

  const sortBy = (e) => {
    let param = e.target.id;
    let sorted = [...locations];
    if (param === "price_level") {
      sorted.sort((a, b) => {
        if (!a[param]) {
          return 1;
        } else if (a[param] > b[param]) {
          return 1;
        } else {
          return -1;
        }
      });
    } else {
      sorted.sort((a, b) => (a[param] < b[param] ? 1 : -1));
    }
    setLocations(sorted);
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={3} className="pr-0">
          <Input
            center={center}
            locationType={locationType}
            onChange={onChange}
            onSubmit={onSubmit}
            onClick={onClick}
            sortBy={sortBy}
          />
          <List locations={locations} />
        </Col>
        <Col sm={9}>
          <RestaurantMap locations={locations} center={coordinates} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
