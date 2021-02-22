import React, { useState } from 'react';
import Axios from 'axios';

const WeatherWidget = () => {
    //geolocation
    const [LAT, setLat] = useState(0);
    const [LON, setLon] = useState(0);
    const [ACTUAL_TEMPERATURE, setActualTemperature] = useState(0);
    const [WEATHER_DESCRIPTION, setWeatherDescription] = useState(0);

    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
      }

    function showPosition(position) {
        console.log("Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude);
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      }

    //connection with API (OpenWeatherMap)

    const API_KEY = `9215f8be73c158f8f88c53de2a692d57`;

    async function weatherData(){
        getLocation();
        const API_RES = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}`).then((res) => res.json());
        console.log(`http://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}`);
        setActualTemperature(Math.ceil(API_RES.main.temp - 273.15));
        setWeatherDescription(API_RES.weather[0].description);
        
    }

    return (
        <div className="content">
            <b>Home page is in maintenance mode</b>
            WeatherWidget
            <button onClick={weatherData()}>WeatherButton</button>
            {ACTUAL_TEMPERATURE}&#176;C
            -{WEATHER_DESCRIPTION}
        </div>

    );
};

export default WeatherWidget;