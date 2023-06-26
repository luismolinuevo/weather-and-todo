import { useState, useEffect } from "react";
import { fetchForecast } from "../../loaders/weather";
import { BiUpArrowAlt, BiDownArrowAlt} from "react-icons/bi"

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

  const convertToFehrenheit = (celsius) => {
    const tempCelsius = celsius - 273.15;
    const tempFahrenheit = (tempCelsius * 9) / 5 + 32;
    return parseInt(tempFahrenheit);
  }

  return (
    <div className="pt-[60px]">
      <div className>
        <h1 className="text-2xl pb-4">Daily Forecast</h1>
        <div className="flex justify-center gap-16 border-t-2 border-white mx-[450px]">
          {forecast && forecast.length != 0 ? (
            forecast.map((item) => (
              <div className="pt-4">
                <h3 className="text-3xl">{item.dayOfWeek}</h3>
                <h4 className="text-lg">{item.date}</h4>
                <div className="flex justify-center">
                  <img
                    src={`https://openweathermap.org/img/w/${item.icon}.png`}
                    alt="weather icon"
                  />
                </div>
                <div className="flex justify-center">
                  <BiUpArrowAlt className="text-2xl"/>
                  <p className="text-xl">{convertToFehrenheit(item.maxTemp)}&deg;F</p>
                  <BiDownArrowAlt className="text-2xl"/>
                  <p className="text-xl">{convertToFehrenheit(item.minTemp)}&deg;F</p>
                </div>
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
