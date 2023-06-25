import { useState, useEffect } from "react";
import { fetchCurrentWeather } from "../loaders/weather";

export default function CurrentWeather() {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const fetchData = await fetchCurrentWeather();
        setWeather(fetchData);
        console.log(fetchData);
      } catch (error) {
        console.log("There has been a issue fetching the forecast");
      }
    };

    getWeather();
  }, []);

  return <div></div>;
}
