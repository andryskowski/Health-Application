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
          navigator.geolocation.getCurrentPosition(setPosition);
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
      }

    function setPosition(position) {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      }

    //connection with API (OpenWeatherMap)

    const API_KEY = `9215f8be73c158f8f88c53de2a692d57`;

    async function getWeatherData(){
        getLocation();
        const URL = `http://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}`;
        const apiRES = await fetch(URL).then((res) => res.json());
        setActualTemperature(Math.ceil(apiRES.main.temp - 273.15));
        setWeatherDescription(apiRES.weather[0].description);
        setWeatherLocation(apiRES.name);
        const iconURL = `http://openweathermap.org/img/wn/${apiRES.weather[0].icon}.png`;
        setWeatherIcon(iconURL);
    }

    useEffect(()=>{
     getWeatherData();
    });

    return (
        <>
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