import { useEffect, useState } from "react"
import { APIKey } from "./config.js"

function App() {
  interface Location {
    lat: number,
    lon: number
  }
  interface WeatherData {
    main: {
      temp: number,
      feels_like: number,
      humidity: number
    }
  }

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  const getweatherData = async (loc: Location) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&appid=${APIKey}`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data)
      })
      .catch(err => console.error(err))
  }
  useEffect(() => {
    getweatherData({ lat: 13.1667, lon: -59.5333 })
  }, [])

  return (
    <div className="flex flex-col items-center min-h-screen bg-blue-200">
      <p className="text-3xl mt-6">
        Welcome to Bim Weather
      </p>
      <p className="text-lg mt-4">Your personalized weather dashboard</p>
      <div> Temperature: {weatherData ? weatherData.main.temp : "Loading..."}&deg;C</div>
    </div>
  )
}

export default App