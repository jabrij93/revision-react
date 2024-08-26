import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
import './App.css'

const weatherUrl = 'http://worldtimeapi.org/api/timezone/Asia/Jakarta';

function App() {
  const [weatherData, setWeatherData] = useState('');
  const [timezone, setTimezone] = useState('');

  useEffect(() => {
    const getAll = async () => {
      try {
        const response = await axios.get(weatherUrl);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    }
    getAll()
  }, []);

  console.log("weatherData.data", weatherData)

  return (
    <div>
      <p>TEST </p>
      
      <div> {weatherData.timezone} </div>
      <div> Current : {weatherData.datetime} </div>
    </div>
  )
}

export default App
