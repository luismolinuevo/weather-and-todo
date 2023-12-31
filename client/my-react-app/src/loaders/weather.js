import axios from "axios";

//Fetch current weather
export async function fetchCurrentWeather() {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=New%20York,US&appid=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const currentWeather = response.data;

    // Convert temperature from Celsius to Fahrenheit
    const temperatureCelsius = currentWeather.main.temp - 273.15;
    const temperatureFahrenheit = (temperatureCelsius * 9) / 5 + 32;
    currentWeather.main.temp_fahrenheit = temperatureFahrenheit;

    // Convert "feels like" temperature from Celsius to Fahrenheit
    const feelsLikeCelsius = currentWeather.main.feels_like - 273.15;
    const feelsLikeFahrenheit = (feelsLikeCelsius * 9) / 5 + 32;
    currentWeather.main.feels_like_fahrenheit = feelsLikeFahrenheit;

    return currentWeather;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
}

//Fetch five day forecast
export async function fetchForecast() {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=New%20York,US&appid=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const forecastData = response.data.list;
    console.log(forecastData);
    const forecast = {};

    //this code will allow me get the highest temp, lowest temp, date, first icon, and day as a string per day
    forecastData.forEach((data) => {
      const date = new Date(data.dt * 1000);
      const maxTemp = data.main.temp_max;
      const minTemp = data.main.temp_min;
      const icon = data.weather[0].icon;

      const dayOfWeek = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
      }).format(date);

      const formattedDate = date.toLocaleDateString();
      const fullDate = formattedDate;

      if (fullDate in forecast) {
        if (maxTemp > forecast[fullDate].maxTemp) {
          forecast[fullDate].maxTemp = maxTemp;
        }
        if (minTemp < forecast[fullDate].minTemp) {
          forecast[fullDate].minTemp = minTemp;
        }
      } else {
        forecast[fullDate] = {
          dayOfWeek,
          maxTemp,
          minTemp,
          icon,
        };
      }
    });

    //format the object to give me what I need
    const dailyForecast = Object.entries(forecast).map(
      ([date, { dayOfWeek, maxTemp, minTemp, icon }]) => ({
        date,
        dayOfWeek,
        maxTemp,
        minTemp,
        icon,
      })
    );

    return dailyForecast;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
}
