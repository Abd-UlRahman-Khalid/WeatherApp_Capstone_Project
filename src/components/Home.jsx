import React, { useEffect, useState } from "react";
import "../App.css";
import umIcon from "../assets/icon-umberella.png";
import comIcon from "../assets/icon-compass.png";
import windIcon from "../assets/icon-wind.png";
import { format } from "date-fns";

function Home() {
  const [wdata, setwData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [forecastData, setForecastData] = useState(null);
  const [locationData, setLocationData] = useState(null);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Fetch data function
  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=5426bf25fb40406590853711240812&q=${city}&days=3`
      );
      if (response.ok) {
        const data = await response.json();
        setLocationData(data.location);
        setwData(data.current);
        setForecastData(data.forecast.forecastday);
      } else {
        console.error("Error fetching weather data");
      }
    } catch (error) {
      console.error("Error Fetching data:", error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchWeatherData(searchQuery);
    }
  };

  // UseEffect to fetch initial weather data for Cairo
  useEffect(() => {
    fetchWeatherData("cairo");
  }, []);

  // Display the current day
  function displayCurrentDay() {
    if (wdata && locationData) {
      const date = new Date(wdata.last_updated);
      return (
        <div className="today forecast w-full lg:w-1/3">
          <div className="forecast-header text-sm p-1 flex justify-between bg-gray-700">
            <div className="day px-2">{days[date.getDay()]}</div>
            <div className="date px-2">
              {date.getDate()} {monthNames[date.getMonth()]}
            </div>
          </div>
          <div className="forecast-content text-left bg-gray-800">
            <div className="location">
              <p>{locationData.name}</p>
            </div>
            <div className="degree flex flex-wrap justify-between">
              <div className="num text-5xl font-bold ">
                {wdata.temp_c} <sup>o</sup>C
              </div>
              <div className="forecast-icon">
                <img
                  src={`https:${wdata.condition.icon}`}
                  alt="temp_condition"
                  width="90"
                />
              </div>
            </div>
            <div className="custom mt-7">
              <p className="text-blue-500">{wdata.condition.text}</p>
            </div>
            <div className="wind-icons flex mt-7">
              <span className="flex mr-3 ">
                <img src={umIcon} alt="umbrella icon" className="mr-2" /> 20%
              </span>
              <span className="flex mr-3 ">
                <img src={windIcon} alt="wind icon" className="mr-2" />{" "}
                {wdata.wind_kph} kph
              </span>
              <span className="flex mr-3 ">
                <img src={comIcon} alt="compass icon" className="mr-2" />{" "}
                {wdata.wind_dir}
              </span>
            </div>
          </div>
        </div>
      );
    } else {
      return <p>Loading...</p>;
    }
  }

  // Display the weather forecast for other days
  function displayAnotherDays() {
    if (forecastData) {
      return forecastData.slice(1).map((day, index) => {
        const date = new Date(day.date);
        return (
          <div key={index} className="forecast  w-full lg:w-1/3 text-center">
            <div className="forecast-header text-sm p-1  bg-gray-700 ">
              <div className="day">
                <span>{days[date.getDay()]}</span>
              </div>
            </div>
            <div className="forecast-content flex flex-col justify-center items-center ">
              <div className="forecast-icon mb-4">
                <img
                  src={`https:${day.day.condition.icon}`}
                  alt=""
                  width="48"
                />
              </div>
              <div className="degree text-3xl font-bold">
                {day.day.maxtemp_c}
                <sup>o</sup>C
              </div>
              <small className="text-xl">{day.day.mintemp_c}</small>
              <div className="custom text-blue-500 mt-7">
                {day.day.condition.text}
              </div>
            </div>
          </div>
        );
      });
    } else {
      return <p>Loading...</p>;
    }
  }

  return (
    <div className="home flex justify-center flex-col">
      <div className="hero flex justify-center">
        <div className="search-box w-[90%]">
          <form className="find-location" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Find your location..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <input
              type="submit"
              value="Find"
              id="submit"
              className="bg-blue-500"
            />
          </form>
        </div>
      </div>
      <div className="forecast-table flex justify-center">
        <div
          className="forecast-container w-[90%] rounded flex justify-center flex-wrap -mt-20 bg-gray-800"
          id="forcast"
        >
          {displayCurrentDay()}
          {displayAnotherDays()}
        </div>
      </div>
    </div>
  );
}

export default Home;
