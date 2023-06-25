import {useState, useEffect } from 'react'
import { fetchForecast } from '../loaders/weather';

export default function HomePage() {
    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        const getWeather = async () => {
            try {
                const fetchData = await fetchForecast();
                setForecast(fetchData);
                console.log(fetchData)
            } catch(error) {
                console.log("There has been a issue fetching the forecast")
            }
        }

        getWeather();
    }, [])
  return (
    <div>

    </div>
  )
}
