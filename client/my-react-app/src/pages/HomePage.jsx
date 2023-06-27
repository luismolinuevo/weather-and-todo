import {useState, useEffect } from 'react'
import { fetchForecast } from '../loaders/weather';
import CurrentWeather from '../componets/weather/CurrentWeather';
import Forecast from '../componets/weather/Forecast';
import Todo from '../componets/todo/Todo';

export default function HomePage() {

  return (
    <div className='px-4 py-6 md:py-10 text-center text-3xl md:text-[50px] w-full text-white
    bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900
    '>
        <h1>New York, NY</h1>
        <CurrentWeather/>
        <Forecast/>
        <Todo/>
    </div>
  )
}
