/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import { useCity } from "../context/CityContext";
import { useEffect } from "react";
import styles from "./City.module.css";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { getCurrentCities, currentCity } = useCity();
  const { id } = useParams();
  useEffect(
    function () {
      getCurrentCities(id);
    },

    [id]
  );
  console.log(currentCity);
  const { cityName, emoji, date, notes } = currentCity;
  const navigate = useNavigate();

  return (
    <div className={styles.cover}>
      <div>
        <p className={styles.para}>City Name</p>
        <div className={styles.info}>
          <img src={`https://flagcdn.com/36x27/${emoji}.png`} />
          <h3 className={styles.head}>{cityName}</h3>
        </div>
      </div>
      <div>
        <p className={styles.para}>You visited {cityName} on </p>
        <p className={styles.head}>{formatDate(date || null)}</p>
      </div>
      <div>
        <p className={styles.para}>Your Note</p>
        <p className={styles.head}>{notes}</p>
      </div>
      <div>
        <p className={styles.para}>To learn more about {cityName}</p>
        <a href={`https://en.wikipedia.org/wiki/${cityName}`}>Check Out →</a>
      </div>
      <button onClick={() => navigate(-1)}>
        <span>←</span>Back
      </button>
    </div>
  );
}

export default City;
