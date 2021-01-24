import axios from "axios";
import {useState, useEffect} from "react";

const WeatherInfo = ({ city }) => {
    const [currentWeather, setCurrentWeather] = useState({
        temperature: null,
        wind_speed: null,
        wind_dir: null,
        weather_icons: [],
    });

    const api_key = process.env.REACT_APP_API_KEY;
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`

    useEffect(()=>{
        axios.get(url).then((response) => {
            setCurrentWeather(response.data.current);
        })
    }, []);

    

    return (
      <div>
        <h2>Weather in {city}</h2>
        <p>Temperature: {currentWeather.temperature} celsius</p>
        
        {currentWeather.weather_icons.map((icon)=>{
            return <img key={icon} src={icon} />
        })}
        <p>Wind: {currentWeather.wind_speed}mph, {currentWeather.wind_dir} direction</p>        
      </div>
    );
  };
  
  export default WeatherInfo;
  