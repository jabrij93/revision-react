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
  const [containers, setContainers] = useState([{ city: '', selectedTimezone: null }]); // Updated containers to hold both city and timezone

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
    setContainers([...containers, { city: '' }]);
  };

  // Handle city change and fetch corresponding timezone data
  const handleCityChange = (index, newCity) => {
    const updatedContainers = [...containers];
    updatedContainers[index].city = newCity;

    // Find matching timezone based on city name
    const matchingTimezone = timezones.find(zone => {
      const cityNameFromZone = zone.zoneName.split('/')[1].replace('_', ' ').toLowerCase();
      return cityNameFromZone.includes(newCity.toLowerCase());
    });

    if (matchingTimezone) {
      updatedContainers[index].selectedTimezone = {
        ...matchingTimezone,
        timestamp: Math.floor(Date.now() / 1000), // Use current timestamp
      };
    } else {
      updatedContainers[index].selectedTimezone = null; // Clear the timezone if no match
    }

    setContainers(updatedContainers); // Update containers with the new city and timezone
  };

  return (
    <div>
      <p> Time Zone App </p>
  
      {containers.map((container, index) => (
        <div key={index} className='timezone'>
          <input
            placeholder='Set a city'
            value={container.city}
            onChange={event => handleCityChange(index, event.target.value)} // Handle city change for each container
          />
          <br />
  
          {container.selectedTimezone ? (
            <div>
              <div>City: {container.selectedTimezone.zoneName.split('/')[1].replace('_', ' ')}</div>
              <div>
                Current Date: {formatDateTime(container.selectedTimezone.timestamp, container.selectedTimezone.gmtOffset).formattedDate}
              </div>
              <div>
                Current Time: {formatDateTime(container.selectedTimezone.timestamp, container.selectedTimezone.gmtOffset).formattedTime} 
                (<span>GMT {formatDateTime(container.selectedTimezone.timestamp, container.selectedTimezone.gmtOffset).gmtOffsetInHours >= 0 ? '+' : ''}
                {formatDateTime(container.selectedTimezone.timestamp, container.selectedTimezone.gmtOffset).gmtOffsetInHours}:00</span>)
              </div>
            </div>
          ) : (
            <div className='offline'>
              <div>
                <div>City: 'Set a city...'</div>
                <div>Current Date: </div>
                <div>Current Time: </div>
              </div>
            </div>
          )}
        </div>
      ))}
  
      <div className='addTimezone'>
        <button onClick={handleAddCity}> + </button>
      </div>
    </div>
  );
}

export default App
