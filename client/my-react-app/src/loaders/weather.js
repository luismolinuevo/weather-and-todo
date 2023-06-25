import axios from "axios";

//fetch current weather
export async function fetchCurrentWeather() {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=New%20York,US&appid=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const currentWeather = response.data;

    return currentWeather;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
}

//fetch five day forecast
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

export function currentTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    
    let period = 'am';
    let formattedHours = hours;
    
    if (hours >= 12) {
      period = 'pm';
      formattedHours = hours % 12 || 12;
    }
    
    const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    
    return formattedTime;
}
