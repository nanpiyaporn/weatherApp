import "./App.css";
import { useState, useEffect } from "react";

const api = {
  key: import.meta.env.VITE_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [weatherData, setWeatherData] = useState(null);
  const [ctoF, setctoF] = useState(false);

  // Calculate statistics
  let maxTemp, minTemp, avgTemp;
  if (weatherData) {
    const temperatures = weatherData.map((day) => day.temp);
    maxTemp = Math.max(...temperatures);
    minTemp = Math.min(...temperatures);
    avgTemp = temperatures.reduce((a, b) => a + b, 0) / temperatures.length;
  }

  // Fetch weather data when search or ctoF changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${api.base}weather?q=${search}&units=metric&APPID=${api.key}`
        );
        const result = await response.json();
        setWeather(result);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [search, ctoF]);

  const searchPressed = () => {
    setSearch(search);
  };

  const toggleFahrenheit = () => {
    setctoF(!ctoF);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* HEADER  */}
        <h1>Weather App</h1>

        {/* Search Box - Input + Button  */}
        <div className="inputBox">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter city/town..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="submit">
            <button onClick={searchPressed}>Search</button>
          </div>
        </div>

        {/* If weather is not undefined display results from API */}
        {typeof weather.main !== "undefined" ? (
          <div>
            <p>Max temperature: {maxTemp}{weather.main.temp_max}</p>
            <p>Min temperature: {minTemp}{weather.main.temp_min}</p>
            <p>Average temperature: {avgTemp}{(weather.main.temp_min) + (weather.main.temp_max) / 2}</p>
            <button onClick={toggleFahrenheit}>Toggle Fahrenheit</button>

            {/* Location  */}
            <p>{weather.name}</p>

            {/* Temperature Celsius  */}
            <p>{weather.main.temp}°C</p>
            {/* Temperature Fahrenheit */}
            {ctoF ? (
              <p>{(weather.main.temp * 9 / 5) + 32}°F</p>
            ) : (
              <p></p>
            )}
            {/* Condition (Sunny ) */}
            <p>{weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
          </div>
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default App;
