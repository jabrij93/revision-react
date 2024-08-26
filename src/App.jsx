import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
import { formatDateTime } from '../helper.js';
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState('');
  const [timezones, setTimezones] = useState([]);
  const [city, setCity] = useState('Kuala_Lumpur')

  useEffect(() => {
    // Fetch the list of timezones
    const fetchTimezones = async () => {
      try {
        const response = await axios.get('http://worldtimeapi.org/api/timezone');
        setTimezones(response.data);
      } catch (error) {
        console.error('Error fetching timezones', error);
      }
    };

    fetchTimezones();
  }, []);

  useEffect(() => {
    if (city) {
      const matchingTimezone = timezones.find(timezone => timezone.includes(city.replace(' ', '_')));
      if (matchingTimezone) {
        const fetchWeatherData = async () => {
          const weatherUrl = `http://worldtimeapi.org/api/timezone/${matchingTimezone}`;
          try {
            const response = await axios.get(weatherUrl);
            setWeatherData(response.data);
          } catch (error) {
            console.error('Error fetching weather data', error);
          }
        };

        fetchWeatherData();
      } else {
        setWeatherData(null); // Clear weather data if no match is found
      }
    } else {
      setWeatherData(null); // Clear weather data if input is empty
    }
  }, [city, timezones]);

  const cityName = weatherData ? weatherData.timezone.split('/').pop().replace('_', ' ') : 'Select a city';

  return (
    <div>
      <p> Time Zone App </p>

      <input placeholder='Set a city' value={city} onChange={event => setCity(event.target.value)} /> <br/>
     
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
        <div>
          <div>City: Select a city</div>
          <div>Current Date: </div>
          <div>Current Time: </div>
        </div>
      )}
    </div>
  )
}

export default App
