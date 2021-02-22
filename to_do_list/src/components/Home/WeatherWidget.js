import React, { useState } from 'react';
import Axios from 'axios';

const WeatherWidget = () => {
    //geolocation
    const [LAT, setLAT] = useState(0);
    const [LON, setLON] = useState(0);
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
        setLAT(position.coords.latitude);
        setLON(position.coords.longitude);
      }

      //connection with API (OpenWeatherMap)

    const API_KEY = `9215f8be73c158f8f88c53de2a692d57`;

    async function weatherData(){
        getLocation();
        await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}`).then((res) => console.log(res.json() ));
        console.log(`http://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}`);
    }

    return (
        <div className="content">
            <b>Home page is in maintenance mode</b>
            WeatherWidget
            <button onClick={weatherData()}>WeatherButton</button>
        </div>

    );
};

export default WeatherWidget;