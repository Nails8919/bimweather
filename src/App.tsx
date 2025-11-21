//Libraries imports
import { useEffect, useState } from "react"
import { APIKey } from "./config.js"
import { cardinalFromDegree, CardinalSubset } from "cardinal-direction"

function App() {
  // Defining interface for location
  interface Location {
    lat: number,
    lon: number
  }
  // Defining interface for weather data
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
      icon: string
    },
    weather: Array<{
      description: string,
      icon: string
    }>,

    wind: {
      speed: number,
      deg: number,
      gust: number
      icon: string
    }
  }

  // State variable to hold weather data
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  // Function to fetch weather data from OpenWeatherMap API
  const getweatherData = async (loc: Location) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&appid=${APIKey}&units=metric`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data)
      })
    //.catch(err => console.error(err))
  }
  // Fetch weather data on component mount
  useEffect(() => {
    getweatherData({ lat: 13.1667, lon: -59.5333 }) // Coordinates for Bridgetown, Barbados
  }, [])

  // Render the weather dashboard UI
  return (
    <>
      {weatherData ?
        <div className="flex flex-col items-center min-h-screen bg-blue-200">
          <p className="text-5xl mt-6">
            Welcome to Bim Weather App
          </p>
          <div className="flex flex-col items-center mt-12">
            <div className=" bg-white h-full w-full bg-opacity-70 rounded-lg text-center shadow-lg p-6 m-6 w-96">
              <p className="text-lg text-gray-700 font-semibold mt-4">Your personalized weather dashboard</p>
              <div className="flex flex items-center gap-4 mt-6">
                <div className="mt-4 font-semibold"> Temperature: <p>{weatherData.main.temp}&deg;C</p></div>
                <div className="mt-2 font-semibold"> Feels Like: 
                  <p>{weatherData.main.feels_like}&deg;C</p></div>
                <div className="mt-2 font-semibold"> Humidity: <p>{weatherData.main.humidity}%</p>  </div>
                <div className="mt-2 font-semibold"> Pressure: <p>{weatherData.main.pressure} hPa</p></div>
                <div className="mt-2 font-semibold"> Min Temperature: <p>{weatherData.main.temp_min}&deg;C</p></div>
                <div className="mt-2 font-semibold"> Max Temperature: <p>{weatherData.main.temp_max}&deg;C</p></div>
              </div>
              <div className="flex flex items-center gap-4 mt-6">
                <div className="mt-2 font-semibold"> Sea Level: <p>{weatherData.main.sea_level} hPa</p></div>
                <div className="mt-2 font-semibold mb-6"> Ground Level: <p>{weatherData.main.grnd_level} hPa</p></div>
                <div className="mt-2 font-semibold mb-6"> Current Weather Description: <p>{weatherData.weather[0].description} {<img src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather icon" />}</p></div>
                <div className="mt-2 font-semibold mb-6"> Wind Speed: <p>{weatherData.wind.speed} m/s</p></div>
                <div className="mt-2 font-semibold mb-6"> Wind Direction: <p>{cardinalFromDegree(weatherData.wind.deg, CardinalSubset.Intercardinal)}</p></div>
                <div className="mt-2 font-semibold mb-6"> Wind Gust: <p>{weatherData.wind.gust} m/s</p></div>
              </div>
            </div>
          </div>
        </div>
        :
        <div className="flex items-center justify-center h-screen w-screen">
          <p className="text-3xl mt-6">
            Loading.....
          </p>
        </div>
      }
    </>
  )
}
export default App