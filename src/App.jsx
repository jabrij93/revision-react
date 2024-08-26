import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count+1)
    console.log("count", count)
  }

  function handleReset() {
    setCount(0)
  }

  return (
    <div>
      <p>TEST </p>
      <div> Let's implement counter </div>
      <button onClick={handleClick}> CLICK ME !</button> 
      <button onClick={handleReset}> RESET </button>
      <div>{count}</div>
    </div>
  )
}

export default App
