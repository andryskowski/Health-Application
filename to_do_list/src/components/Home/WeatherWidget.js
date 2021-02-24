import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './sass/App.sass';

const WeatherWidget = () => {
    //geolocation
    const [LAT, setLat] = useState(0);
    const [LON, setLon] = useState(0);
    const [ACTUAL_TEMPERATURE, setActualTemperature] = useState(0);
    const [WEATHER_DESCRIPTION, setWeatherDescription] = useState(0);
    const [WEATHER_LOCATION, setWeatherLocation] = useState(0);
    const [WEATHER_ICON, setWeatherIcon] = useState(0);

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

    async function getWeatherData(){
        getLocation();
        const API_RES = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}`).then((res) => res.json());
        console.log(`http://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}`);
        setActualTemperature(Math.ceil(API_RES.main.temp - 273.15));
        setWeatherDescription(API_RES.weather[0].description);
        setWeatherLocation(API_RES.name);
        setWeatherIcon(`http://openweathermap.org/img/wn/${API_RES.weather[0].icon}.png`)
    }

    useEffect(()=>{
     getWeatherData();
    });

    return (
        <>
            {/* <button onClick={getWeatherData()}>WeatherButton</button> */}
            <div className="weather-widget widget">
            <div class="first-row">
            <h1 class="weather-temperature">{ACTUAL_TEMPERATURE}&#176;C</h1>
            <img class="weather-icon" src={WEATHER_ICON}></img>
            </div>
            <h3>{WEATHER_LOCATION}, {WEATHER_DESCRIPTION}</h3>
            
            </div>
        </>

    );
};

export default WeatherWidget;