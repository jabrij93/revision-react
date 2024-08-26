import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
import { formatDateTime } from '../helper.js';
import './App.css'



function App() {
  const [weatherData, setWeatherData] = useState('');
  const [timezone, setTimezone] = useState('');
  const [city, setCity] = useState('Kuala_Lumpur')

  useEffect(() => {
    const getAll = async () => {
      const weatherUrl = `http://worldtimeapi.org/api/timezone/Asia/${city}`
      try {
        const response = await axios.get(weatherUrl);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    }
    getAll()
  }, [city]);

  console.log("weatherData.data", weatherData)
  // Extract the city name from the timezone
  const cityName = weatherData.timezone ? weatherData.timezone.split('/')[1] : '';

  return (
    <div>
      <p>TEST </p>

      <input placeholder='Set a city' value={city} onChange={event => setCity(event.target.value)} />
     
      {weatherData ? (
        
        <div>
          <div>City: {cityName} </div>
          <div>
            Current Date: {formatDateTime(weatherData.datetime).formattedDate}
          </div>
          <div>
            Current Time: {formatDateTime(weatherData.datetime).formattedTime}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default App
