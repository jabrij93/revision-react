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

  // REFERENCE
  // Accessing the environment variable
  const apiKey = process.env.TIMEZONE_API_KEY;

  useEffect(() => {
    const getAll = async () => {
      const timezoneDB = `http://api.timezonedb.com/v2.1/list-time-zone?key=${apiKey}`
      // const weatherUrl = `http://worldtimeapi.org/api/timezone/Asia/${city}`
      try {
        const response = await axios.get(timezoneDB);
        setTimezone(response.data);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    }
    getAll()
  }, []);

  //testt 

  console.log("timezoneDB", timezone)
  // Extract the city name from the timezone
  const cityName = weatherData.timezone ? weatherData.timezone.split('/')[1] : '';

  return (
    <div>
      <p>TEST </p>

      <input placeholder='Set a city' value={city} onChange={event => setCity(event.target.value)} />
     
      {weatherData && city ? (
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
        <div>
          <div>City: Select a city</div>
          <div>Current Date: N/A</div>
          <div>Current Time: N/A</div>
        </div>
      )}
    </div>
  )
}

export default App
