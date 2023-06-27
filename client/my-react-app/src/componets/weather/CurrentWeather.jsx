import { useState, useEffect } from "react";
import { fetchCurrentWeather } from "../../loaders/weather";
import TimeDisplay from "../LiveTime";

export default function CurrentWeather() {
  const [weather, setWeather] = useState([]);
  const [formattedDate, setFormattedDate] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [weatherInfo, setWeatherInfo] = useState([]);
  const [weatherMainInfo, setWeatherMainInfo] = useState([]);
  const [wind, setWind] = useState("");

  useEffect(() => {
    const getWeather = async () => {
      try {
        const fetchData = await fetchCurrentWeather();
        setWeather(fetchData);
        setWeatherInfo(fetchData.weather[0]);
        setWeatherMainInfo(fetchData.main);
        setWind(fetchData.wind);
  
        const date = new Date(fetchData.dt * 1000);
        const options = { timeZone: "America/New_York" };
  
        setFormattedDate(date.toLocaleDateString(undefined, options));
        setDayOfWeek(
          new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            timeZone: "America/New_York",
          }).format(date)
        );
  
        console.log(fetchData);
      } catch (error) {
        console.log("There has been an issue fetching the weather");
      }
    };
  
    getWeather();
  }, []);
  
  
  if (!weather) {
    return null; // Render null or a loading spinner while waiting for the weather data
  }


  return (
    <div className="mt-6">
      <h1 className="text-2xl">
        {dayOfWeek}, {formattedDate} | {<TimeDisplay/>}
      </h1>
      <h3 className="text-2xl pt-4">{weatherInfo.description}</h3>
      <div className="flex justify-center pt-8 gap-10 md:gap-16 items-center">
        <img src={`https://openweathermap.org/img/w/${weatherInfo.icon}.png`} alt="weather icon" className="w-[60px] md:w-[100px]"/>
        <h3 className="">{parseInt(weatherMainInfo.temp_fahrenheit)}&deg;F</h3>
        <ul className="text-lg md:text-3xl">
          <li>Humidity: {weatherMainInfo.humidity}%</li>
          <li>Wind: {wind.speed}mph</li>
          <li>Feels Like: {parseInt(weatherMainInfo.feels_like_fahrenheit)}&deg;F</li>
        </ul>
      </div>
    </div>
  );
}
