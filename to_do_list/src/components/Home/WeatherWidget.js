import React from 'react';

const WeatherWidget = () => {

    const API_KEY = `9215f8be73c158f8f88c53de2a692d57`;
    async function weatherData(){
        
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Warsaw&appid=${API_KEY}`
        ).then((res) => console.log(res.json() ));
    }

    return (
        <div className="content">
            WeatherWidget
            <button onClick={weatherData()}>WeatherButton</button>
        </div>

    );
};

export default WeatherWidget;