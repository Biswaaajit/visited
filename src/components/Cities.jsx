/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import styles from "./Cities.module.css";
import { useCity } from "../context/CityContext";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
function Cities() {
  const { cities } = useCity();
  if (!cities.length)
    return (
      <div>
        <Announce />
      </div>
    );
  return (
    <ul className={styles.city}>
      {cities.map((city) => (
        <Citylist city={city} key={city.id} />
      ))}
    </ul>
  );
}
function Citylist({ city }) {
  const { currentCity, deleteCity } = useCity();
  const { emoji, cityName, date, id, position } = city;
  const { lat, lng } = position;
  const flag = emoji;
  function handleDelete() {
    deleteCity(id);
  }
  return (
    <li
      className={`${styles.list} ${
        currentCity.id === id ? styles.listActive : ""
      }`}
    >
      <Link to={`${id}?lat=${lat}&lng=${lng}`}>
        <div>
          <img src={`https://flagcdn.com/36x27/${flag}.png`} />
          <p>{cityName}</p>
        </div>
        <p>{formatDate(date)}</p>
      </Link>
      <button onClick={handleDelete}>&times;</button>
    </li>
  );
}
function Announce() {
  return (
    <p className={styles.message}>
      Enter your first City bt clicking on the map
    </p>
  );
}
export default Cities;
