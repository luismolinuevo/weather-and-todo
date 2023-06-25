import { useState, useEffect } from "react";
import { fetchCurrentWeather, currentTime } from "../../loaders/weather";
import TimeDisplay from "./Time";

export default function CurrentWeather() {
  const [weather, setWeather] = useState([]);
  const [formattedDate, setFormattedDate] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [time, setTime] = useState()

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


  return (
    <div className="mt-6">
      <h1 className="text-xl">
        {dayOfWeek}, {formattedDate} | {<TimeDisplay/>}
      </h1>
    </div>
  );
}
