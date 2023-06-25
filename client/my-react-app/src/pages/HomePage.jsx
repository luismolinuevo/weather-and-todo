import {useState, useEffect } from 'react'
import { fetchForecast } from '../loaders/weather';
import Weather from '../componets/Weather';

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
    <div className='px-4 py-6 md:py-10 text-center text-2xl md:text-3xl'>
        <h1>New York, NY</h1>
        <Weather/>
    </div>
  )
}
