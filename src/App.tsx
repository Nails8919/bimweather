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
      humidity: number,
      pressure: number,
      temp_min: number,
      temp_max: number,
      sea_level: number,
      grnd_level: number
    }
  }

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  const getweatherData = async (loc: Location) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&appid=${APIKey}&units=metric`)
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
      <p className="text-5xl mt-6">
        Welcome to Bim Weather
      </p>
      <p className="text-lg text-gray-700 text-center font-semibold mt-4">Your personalized weather dashboard</p>
      <div className="mt-4 font-semibold"> Temperature: {weatherData ? weatherData.main.temp : "Loading..."}&deg;C</div>
      <div className="mt-2 font-semibold"> Feels Like: {weatherData ? weatherData.main.feels_like : "Loading..."}&deg;C</div>
      <div className="mt-2 font-semibold"> Humidity: {weatherData ? weatherData.main.humidity : "Loading..."}%</div>
      <div className="mt-2 font-semibold"> Pressure: {weatherData ? weatherData.main.pressure : "Loading..."} hPa</div>
      <div className="mt-2 font-semibold"> Min Temperature: {weatherData ? weatherData.main.temp_min : "Loading..."}&deg;C</div>
      <div className="mt-2 font-semibold"> Max Temperature: {weatherData ? weatherData.main.temp_max : "Loading..."}&deg;C</div>
      <div className="mt-2 font-semibold"> Sea Level: {weatherData ? weatherData.main.sea_level : "Loading..."} hPa</div>
      <div className="mt-2 font-semibold mb-6"> Ground Level: {weatherData ? weatherData.main.grnd_level : "Loading..."} hPa</div>
    </div>
  )
}

export default App