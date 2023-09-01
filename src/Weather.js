import React, { useEffect, useState } from "react";
import "./weather.css";
import cloudy from "./assets/cloudy.png";
import humidity from "./assets/humidity.png";
import wind from "./assets/wind.png";
import sunny from "./assets/sun.png";
import raining from "./assets/heavy-rain.png";
import Mist from "./assets/mist.png";
import Haze from "./assets/haze.png";
import axios from "axios";

function Weather() {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
    image: cloudy,
  });

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (name !== "") {
      const api = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=5b16b66df7fa4d7f3d184649ead148ee`;

      axios
        .get(api)
        .then((res) => {
          console.log(res.data);
          let imagePath = "";
          if (res.data.weather[0].main === "Clouds") {
            imagePath = cloudy;
          } else if (res.data.weather[0].main === "Rain") {
            imagePath = raining;
          } else if (res.data.weather[0].main === "Mist") {
            imagePath = Mist;
          } else if (res.data.weather[0].main === "Haze") {
            imagePath = Haze;
          } else {
            imagePath = sunny;
          }
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath,
          });
          setError("");
          setName("");
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 404) {
            setError("Invalid City Name");
          } else {
            setError("");
          }
        });
    }
  };

  return (
    <div className="weatherContainer">
      <div className="weather">
        <div className="searchBox">
          <input
            type="text"
            placeholder="Enter City Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>
        <div className="weather-info">
          <img src={data.image} alt="" className="icon" />
          <h1>{Math.round(data.celcius)}°c</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src={humidity} className="inner-icon" />
              <div className="humidity">
                <p>{data.humidity}%</p>
                <p style={{ fontFamily: "Poppins" }}>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src={wind} className="inner-icon" />
              <div className="wind">
                <p>{Math.round(data.speed)} km/h</p>
                <p style={{ fontFamily: "Poppins" }}>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
