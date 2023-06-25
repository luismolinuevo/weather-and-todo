import { useState, useEffect } from "react";
import { fetchCurrentWeather } from "../../loaders/weather";
import TimeDisplay from "../LiveTime";

export default function CurrentWeather() {
  const [weather, setWeather] = useState([]);
  const [formattedDate, setFormattedDate] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState("");

  useEffect(() => {
    const getWeather = async () => {
      try {
        const fetchData = await fetchCurrentWeather();
        setWeather(fetchData);
        const date = new Date(fetchData.dt * 1000);

        setFormattedDate(date.toLocaleDateString());
        setDayOfWeek(
          new Intl.DateTimeFormat("en-US", {
            weekday: "long",
          }).format(date)
        );
        console.log(fetchData);
      } catch (error) {
        console.log("There has been a issue fetching the forecast");
      }
    };

    getWeather();
  }, []);

  function celsiusToFahrenheit(celsius) {
    var fahrenheit = (celsius * 9/5) + 32;
    return fahrenheit;
  }
  


  return (
    <div className="mt-6">
      <h1 className="text-2xl">
        {dayOfWeek}, {formattedDate} | {<TimeDisplay/>}
      </h1>
      <h3 className="text-xl pt-4">{weather.weather[0].description}</h3>
      <div className="flex justify-center">
        <img src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="weather icon" />
        <h3>{celsiusToFahrenheit(weather.main.temp)}</h3>
      </div>
    </div>
  );
}
