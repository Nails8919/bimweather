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
      gust?: number // Made gust optional as it may not always be present
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
            <div className="border-2 border-blue-500 rounded-lg p-6 bg-white h-full w-full bg-opacity-70 rounded-lg text-center shadow-lg p-6 m-6 w-96">
              <p className="text-3xl text-gray-700 font-semibold underline mt-4">Your Personalized Weather Dashboard</p>
              <div className="flex flex items-baseline justify-center gap-4 mt-6 ">
                <div className="font-semibold"> Temperature: <p>{weatherData.main.temp}&deg;C</p></div>
                <div className="font-semibold"> Feels Like:
                  <p>{weatherData.main.feels_like}&deg;C</p></div>
                <div className="font-semibold"> Humidity: <p>{weatherData.main.humidity}%</p>  </div>
                <div className="font-semibold"> Pressure: <p>{weatherData.main.pressure} hPa</p></div>
                <div className="font-semibold"> Min Temperature: <p>{weatherData.main.temp_min}&deg;C</p></div>
                <div className="font-semibold"> Max Temperature: <p>{weatherData.main.temp_max}&deg;C</p></div>
              </div>
              <div className="flex flex items-baseline justify-center gap-4 mt-6 ">
                <div className="font-semibold"> Sea Level: <p>{weatherData.main.sea_level} hPa</p></div>
                <div className="font-semibold"> Ground Level: <p>{weatherData.main.grnd_level} hPa</p></div>
                <div className="font-semibold text-center"> Current Weather Description: <p>{weatherData.weather[0].description} {<img src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather icon" className="block flex justify-center mx-auto" />}</p></div>
                <div className="font-semibold"> Wind Speed: <p>{weatherData.wind.speed} m/s
                  {weatherData.wind.gust != null && ` with gusts up to ${weatherData.wind.gust} m/s`} in a {cardinalFromDegree(weatherData.wind.deg, CardinalSubset.Intercardinal)} direction
                </p></div>
                {/* <div className="font-semibold"> Wind Direction: <p>{cardinalFromDegree(weatherData.wind.deg, CardinalSubset.Intercardinal)} </p></div> */}
                {/* <div className="font-semibold"> Wind Gust: <p>{cardinalFromDegree(weatherData.wind.gust, CardinalSubset.Intercardinal)} m/s</p></div> */}
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