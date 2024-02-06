/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const Current = createContext();
function CityContext({ children }) {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [userPosi, setUserPosi] = useState(null);
  const [posiLoading, setPosiLoading] = useState(false);
  useEffect(function () {
    async function getCities() {
      const res = await fetch("http://localhost:9000/cities");
      const data = await res.json();
      console.log(data);
      setCities(data);
    }
    getCities();
  }, []);
  async function getCurrentCities(id) {
    const res = await fetch(`http://localhost:9000/cities/${id}`);
    const data = await res.json();
    setCurrentCity(data);
    console.log(data);
  }
  function getUserPosi() {
    setPosiLoading(true);
    navigator.geolocation.getCurrentPosition((posi) => {
      setUserPosi({ lat: posi.coords.latitude, lng: posi.coords.longitude });
      setPosiLoading(false);
    });
  }
  async function createCity(newCity) {
    const res = await fetch("http://localhost:9000/cities/", {
      method: "POST",
      body: JSON.stringify(newCity),
      header: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    setCities((cities) => [...cities, data]);
  }
  async function deleteCity(id) {
    await fetch(`http://localhost:9000/cities/${id}`, { method: "DELETE" });
    setCities((cities) => cities.filter((city) => city.id !== id));
  }
  return (
    <Current.Provider
      value={{
        cities,
        currentCity,
        getCurrentCities,
        getUserPosi,
        userPosi,
        posiLoading,
        setUserPosi,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </Current.Provider>
  );
}
function useCity() {
  const context = useContext(Current);
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CityContext, useCity };
