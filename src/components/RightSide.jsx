/* eslint-disable react/prop-types */
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./RightSide.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useCity } from "../context/CityContext";
import { useEffect, useState } from "react";
function RightSide() {
  // eslint-disable-next-line no-unused-vars
  const [search] = useSearchParams();
  const [currentPosi, setCurrentPosi] = useState([40, 0]);
  const mlat = search.get("lat");
  const mlng = search.get("lng");
  const { cities, getUserPosi, userPosi, posiLoading, setUserPosi } = useCity();

  useEffect(
    function () {
      if (mlat && mlng) setCurrentPosi([mlat, mlng]);
    },
    [mlat, mlng]
  );
  useEffect(
    function () {
      if (userPosi) setCurrentPosi([userPosi.lat, userPosi.lng]);
      return function () {
        setUserPosi(null);
      };
    },
    [userPosi, setUserPosi]
  );
  return (
    <div className={styles.cover}>
      {userPosi === null ? (
        <button className={styles.position} onClick={getUserPosi}>
          {posiLoading ? "Loading" : "User Location"}
        </button>
      ) : (
        ""
      )}
      <MapContainer
        center={currentPosi}
        zoom={8}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>{city.cityName}</Popup>
          </Marker>
        ))}
        <ChangePosi position={currentPosi} />
        <MapClick />
      </MapContainer>
    </div>
  );
}
function ChangePosi({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
function MapClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default RightSide;
