import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
import { formatDateTime } from '../helper.js';
import { TIMEZONE_API_KEY } from '../utils/config.js';  // Importing the key from config.js
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState('');
  const [timezones, setTimezones] = useState([]);
  const [city, setCity] = useState('Kuala_Lumpur');
  const [selectedTimezone, setSelectedTimezone] = useState(null);

  useEffect(() => {
    const getAll = async () => {
      const timezoneDB = `http://api.timezonedb.com/v2.1/list-time-zone?key=${TIMEZONE_API_KEY}&format=json`
      // const weatherUrl = `http://worldtimeapi.org/api/timezone/Asia/${city}`
      try {
        const response = await axios.get(timezoneDB);
        setTimezones(response.data);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    }
    getAll()
  }, []);

  useEffect(() => {
    if (timezones.zones) {  // Check if zones property exists
      const findTimezones = timezones.zones;
      const matchingTimezone = findTimezones.find(zone => 
        zone.zoneName.toLowerCase().includes(city.toLowerCase())
      );
      setSelectedTimezone(matchingTimezone);
    }
  }, [city, timezones]);

  
  //testt 
  console.log("timezoneDB", timezones)
  console.log("timezoneDB.zones", timezones.zones)
  // Extract the city name from the timezone
  // const cityName = weatherData.timezone ? weatherData.timezone.split('/')[1] : '';


  return (
    <div>
      <p> Time Zone App </p>

      <input placeholder='Set a city' value={city} onChange={event => setCity(event.target.value)} /> <br/>
     
      {selectedTimezone ? (
        <div>
          <div>City: {selectedTimezone.zoneName.split('/')[1].replace('_', ' ')}</div>
          <div>
            Current Date: {formatDateTime(selectedTimezone.timestamp, selectedTimezone.gmtOffset).formattedDate} 
          </div>
          <div>
            Current Time: {formatDateTime(selectedTimezone.timestamp, selectedTimezone.gmtOffset).formattedTime}
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
