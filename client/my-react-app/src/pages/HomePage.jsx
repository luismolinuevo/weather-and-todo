import {useState, useEffect } from 'react'
import { fetchForecast } from '../loaders/weather';
import Weather from '../componets/weather/Weather';
import Forecast from '../componets/weather/Forecast';

export default function HomePage() {
    const [forecast, setForecast] = useState([]);

    // useEffect(() => {
    //     const getWeather = async () => {
    //         try {
    //             const fetchData = await fetchForecast();
    //             setForecast(fetchData);
    //             console.log(fetchData)
    //         } catch(error) {
    //             console.log("There has been a issue fetching the forecast")
    //         }
    //     }

    //     getWeather();
    // }, [])

  return (
    <div className='px-4 py-6 md:py-10 text-center text-3xl md:text-[50px] w-full text-white
    bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-blue-100 via-blue-300 to-blue-500
    '>
        <h1>New York, NY</h1>
        <Weather/>
        <Forecast/>
    </div>
  )
}
