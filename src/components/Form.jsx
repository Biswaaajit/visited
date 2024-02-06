import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Form.module.css";
import { useEffect, useReducer } from "react";
import MessagePage from "../pages/MessagePage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCity } from "../context/CityContext";

const initial = {
  cityName: "",
  status: "",
  emoji: "",
  country: "",
  notes: "",
  date: new Date(),
};
function reducer(state, action) {
  switch (action.type) {
    case "setCityName":
      return {
        ...state,
        cityName: action.payload,
      };
    case "dataFromMap":
      return {
        ...state,
        cityName: action.payload.city || action.payload.locality || "",
        emoji: action.payload.countryCode.toLowerCase(),
        country: action.payload.countryName,
        status: "",
      };
    case "message":
      return {
        ...state,
        status: action.payload,
      };
    case "date":
      return {
        ...state,
        date: action.payload,
      };
    case "changeNote":
      return {
        ...state,
        notes: action.payload,
      };
    default:
      throw new Error("wrong action");
  }
}
function Form() {
  const [local, dispatch] = useReducer(reducer, initial);
  const { cityName, status, emoji, date, country, notes } = local;
  const { createCity } = useCity();

  const navigate = useNavigate();
  const [para] = useSearchParams();
  const lat = para.get("lat");
  const lng = para.get("lng");

  async function handleForm(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      emoji,
      date,
      country,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/track");
  }
  useEffect(
    function () {
      async function getLocation() {
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          console.log(data);
          if (!data.countryName)
            throw new Error(
              "This area doesnot fall under any country. Plz click somewhere else "
            );
          dispatch({
            type: "dataFromMap",
            payload: data,
          });
        } catch (err) {
          dispatch({ type: "message", payload: err.message });
        }
      }
      getLocation();
    },
    [lat, lng]
  );
  if (status !== "") return <MessagePage>{status}</MessagePage>;
  return (
    <div className={styles.cover}>
      <form className={styles.form} onSubmit={handleForm}>
        <div>
          <label className={styles.label}>
            <span>City name</span>
            {emoji !== "" && (
              <img src={`https://flagcdn.com/36x27/${emoji}.png`} />
            )}
          </label>
          <input
            type="text"
            onChange={(e) =>
              dispatch({ type: "setCityName", payload: e.target.value })
            }
            value={cityName}
          />
        </div>
        <div>
          <label>When did you go ?</label>
          <DatePicker
            selected={date}
            onChange={(date) => dispatch({ type: "date", payload: date })}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div>
          <label>Little synopsis about your trip</label>
          <textarea
            onChange={(e) =>
              dispatch({ type: "changeNote", payload: e.target.value })
            }
          ></textarea>
        </div>
        <div className={styles.btn}>
          <button className={styles.add}>
            <span>+</span>Add
          </button>
          <button
            type="button"
            className={styles.back}
            onClick={() => navigate(-1)}
          >
            <span>&larr;</span> Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
