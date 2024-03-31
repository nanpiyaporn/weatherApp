import "./App.css";
import { useState } from "react";

const api = {
  key: import.meta.env.VITE_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [weatherData, setWeatherData] = useState(null);
  const [ctoF,setctoF]= useState(null);


  /*
    Search button is pressed. Make a fetch call to the Open Weather Map API.
  */
 // Calculate statistics
let maxTemp, minTemp, avgTemp;
if (weatherData) {
 const temperatures = weatherData.map(day => day.temp);
 maxTemp = Math.max(...temperatures);
minTemp = Math.min(...temperatures);
avgTemp = temperatures.reduce((a, b) => a + b, 0) / temperatures.length;
}
  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(weather);
        setWeather(result);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* HEADER  */}
        <h1>Weather App</h1>

        {/* Search Box - Input + Button  */}
        <div  className ="inputBox">
          <div className = "search-box">
          <input
            type="text"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
            
           
          />
           <p></p>
          </div>
          <div className = "submit">
          <button onClick={searchPressed}>Search</button>
          </div>
        </div>

        {/* If weather is not undefined display results from API */}
        {typeof weather.main !== "undefined" ? (
          <div>
            <button onClick={searchPressed}>Search</button>
            <p>Max temperature: {maxTemp}</p>
            <p>Min temperature: {minTemp}</p>
            <p>Average temperature: {avgTemp}</p>
            <button onClick={setWeatherData}>Search</button>
          
            {/* Location  */}
            <p>{weather.name}</p>

            {/* Temperature Celsius  */}
            <p>{weather.main.temp}°C</p>
            {/* Temperature Fahrenheit */}
            {ctoF ? (
              <p>{(weather.main.temp * 9/5) + 32}°F</p>
            ) : (
              <p>{/*weather.main.temp*/}</p>
            )}
            {/* Condition (Sunny ) */}
            <p>{weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
            <p>{weatherData && (
              <div className="stat">
             
            </div>
      )}</p>
        
          </div>
          
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default App;