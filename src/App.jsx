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
  const [city, setCity] = useState('Jakarta');
  const [selectedTimezone, setSelectedTimezone] = useState(null);
  const [containers, setContainers] = useState([{ city: '' }]);

  

  useEffect(() => {
    const getAll = async () => {
      const timezoneDB = `http://api.timezonedb.com/v2.1/list-time-zone?key=${TIMEZONE_API_KEY}&format=json`
      try {
        const response = await axios.get(timezoneDB);
        if (response.data?.zones?.length) {
          setTimezones(response.data.zones);
        } else {
          console.error('Unexpected data format', response.data);
        }
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };
    getAll();
  }, []);

  useEffect(() => {
    if (timezones.length > 0) {
      const matchingTimezone = timezones.find(zone => {
        const cityNameFromZone = zone.zoneName.split('/')[1].replace('_', ' ').toLowerCase();
        return cityNameFromZone.includes(city.toLowerCase());
      });

      console.log("Matching TIMEZONE", matchingTimezone)
  
      if (matchingTimezone) {
        setSelectedTimezone({
          ...matchingTimezone,
          timestamp: Math.floor(Date.now() / 1000)  // Use current timestamp
        });
      }
    }
  }, [city, timezones]);
  
  console.log("timezoneDB", timezones)
  console.log("timezoneDB.zones", timezones.zones)

  // const handleAddCity = async (city) => {
  //     console.log("add city");
  // }

  const handleAddCity = () => {
    setContainers([...containers, {}]); // Add a new empty container
  };

  const handleCityChange = (index, newCity) => {
    const updatedContainers = [...containers];
    updatedContainers[index].city = newCity;
    setContainers(updatedContainers);
  };

  return (
    <div>
      <p> Time Zone App </p>

      <input placeholder='Set a city' value={city} onChange={event => setCity(event.target.value)} /> <br/>

      {selectedTimezone ? (
        <div>
          {containers.map((container, index) => (
            <div key={index} className='timezone'>
              <div>City: {selectedTimezone.zoneName.split('/')[1].replace('_', ' ')}</div>
              <div>
                Current Date: {formatDateTime(selectedTimezone.timestamp, selectedTimezone.gmtOffset).formattedDate}
              </div>
              <div>
                Current Time: {formatDateTime(selectedTimezone.timestamp, selectedTimezone.gmtOffset).formattedTime} 
                (<span>GMT {formatDateTime(selectedTimezone.timestamp, selectedTimezone.gmtOffset).gmtOffsetInHours >= 0 ? '+' : ''}
                {formatDateTime(selectedTimezone.timestamp, selectedTimezone.gmtOffset).gmtOffsetInHours}:00</span>)
              </div>
            </div>
          ))}

          <div className='addTimezone'>
            <button onClick={handleAddCity}> + </button>
          </div>
        </div>
      ) : (
        <div>
          {containers.map((container, index) => (
            <div key={index}>
              <input 
                placeholder='Set a city' 
                value={container.city} 
                onChange={event => handleCityChange(index, event.target.value)} 
              /> <br/>
              <div>
                <div>City: {container.city ? container.city : 'Select a city'}</div>
                <div>Current Date: </div>
                <div>Current Time: </div>
              </div>
            </div>
          ))}

          <div className='addTimezone'>
            <button onClick={handleAddCity}> + </button>
          </div>
        </div>
      )}
    </div>

  )
}

export default App
