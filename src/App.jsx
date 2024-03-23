import { useEffect, useState } from 'react';
import './App.css';
import clearday from './img/clear-day.png'
import clearnight from './img/clear-night.png'
import cloudy from './img/cloudy.png';
import fog from './img/fog.png';
import partlycloudyday from './img/partly-cloudy-day.png';
import partycloudynight from './img/partly-cloudy-night.png'
import rain from './img/rain.png';
import snow from './img/snow.png';
import thunder from './img/thunder.png';
import wind from './img/wind.png';
import hail from './img/hail.png';



function App() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});

  const getWeatherIcon = (iconName) => {
    switch (iconName) {
      case "clear-day":
        return clearday;
      case "clear-night":
        return clearnight;
      case "cloudy":
        return cloudy;
      case "fog":
        return fog;
      case "partly-cloudy-day":
        return partlycloudyday;
      case "partly-cloudy-night":
        return partycloudynight;
      case "rain":
        return rain;
      case "snow":
        return snow;
      case "thunder":
        return thunder;
      case "wind":
        return wind;
      case "hail":
        return hail;
    }
  }
  
  const fetchAPI = async () => {
    try {
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=CPNAEBDH3ABJ2YT34JWTFT3W7&contentType=json`);
      if (response.ok) {
        const result = await response.json();
        setData(result);
        console.log(result);
        console.log(data?.currentConditions?.icon)
      } else {
        console.error('Error fetching data:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <div className="app">
        <h1>Weather App</h1>
        <div className="search">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter City Name"
            onChange={(event) => setLocation(event.target.value)}
          />
          <button
            onClick={fetchAPI}
          >
            Search
          </button>
        </div>
        <div className="weather">
        <img src={getWeatherIcon(data?.currentConditions?.icon)} alt={data?.currentConditions?.icon} />
        <h2>{data?.currentConditions?.temp}°C</h2>
        <p>{data?.currentConditions?.conditions}</p>
          <h5>{data?.resolvedAddress}</h5>
        </div>
      </div>
    </>
  );
}

export default App;
