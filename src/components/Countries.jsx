/* eslint-disable react/prop-types */
import { useCity } from "../context/CityContext";
import styles from "./Countries.module.css";
function Countries() {
  const { cities } = useCity();
  const countries = cities.reduce((list, city) => {
    if (!list?.map((el) => el.country).includes(city.country))
      return [...list, { country: city.country, emoji: city.emoji }];
    else return list;
  }, []);
  console.log(countries);
  return (
    <ul className={styles.country}>
      {countries.map((country) => (
        <CountryList country={country} key={country.country} />
      ))}
    </ul>
  );
}
function CountryList({ country }) {
  return (
    <li className={styles.list}>
      <img src={`https://flagcdn.com/36x27/${country.emoji}.png`} />
      <p>{country.country}</p>
    </li>
  );
}
export default Countries;
