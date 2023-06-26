import { useState, useEffect } from "react";
import { fetchForecast } from "../../loaders/weather";

export default function Forecast() {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const getForecast = async () => {
      try {
        const fetchData = await fetchForecast();
        setForecast(fetchData);
        console.log(fetchData);
      } catch (error) {
        console.log("There has been a issue fetching the forecast");
      }
    };

    getForecast();
  }, []);

  return (
    <div className="pt-[60px]">
      <div className>
      <h1 className="text-2xl pb-4">Daily Forecast</h1>
      <div className="flex justify-center gap-16 border-t-2 border-white mx-[500px]">
        {forecast && forecast.length != 0 ? (
          forecast.map((item) => (
            <div>
              <h3 className="text-xl">{item.dayOfWeek}</h3>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
    </div>
  );
}
