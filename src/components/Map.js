import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function SetViewOnClick({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

const RestaurantMap = ({ locations, center }) => {
  return (
    <>
      <MapContainer center={center} zoom={15}>
        <TileLayer url="https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5kcmV3bml1IiwiYSI6ImNrbm56ZHpxNjEzOHMydXA4aGdkZ3B3eXIifQ.Z88u0kVU0H8RCmLIgoUjXg" />
        {locations.map((location, idx) => {
          const price = location.price_level
            ? "$".repeat(location.price_level)
            : "No Price Data";
          return (
            <Marker
              position={[
                location.geometry.location.lat,
                location.geometry.location.lng,
              ]}
              key={idx}
            >
              <Popup>
                <h4>{location.name}</h4>
                <p className="m-0">
                  <span className="font-weight-bold">Price:</span>{" "}
                  {price}
                </p>
                <p className="m-0">
                  <span className="font-weight-bold">Rating:</span>{" "}
                  {location.rating}/5.0
                </p>
                <Card.Link
                  href={`https://www.google.com/maps/place/?q=place_id:${location.place_id}`}
                  target="_blank"
                >
                  Get Directions
                </Card.Link>
              </Popup>
            </Marker>
          );
        })}
        <SetViewOnClick coords={center} />
      </MapContainer>
    </>
  );
};

// const RestaurantMap = () => {
//   const defaultPosition: LatLngExpression = [48.864716, 2.349]; // Paris position
//
//   return (
//     <div className="map__container">
//       <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//         />
//       </MapContainer>
//     </div>
//   );
// };

export default RestaurantMap;
