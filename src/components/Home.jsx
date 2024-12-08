import React, { useEffect, useState } from "react";
import "../App.css";

function Home() {
  const [wdata, setwData] = useState(null);
  const [location, setLocation] = useState("");
  const [searchData, setSearchData] = useState(null);
  const weatherData = (query) => {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=5426bf25fb40406590853711240812&q=${query}&days=3`
    )
      .then((response) => response.json())
      .then((data) => setwData(data))
      .catch((error) => error);
  };
  useEffect(() => {
    weatherData("cairo");
  }, []);
  const SearchLocation = (loc) => {
    fetch(`
        http://api.weatherapi.com/v1/search.json?key=5426bf25fb40406590853711240812&q=$${loc}`)
      .then((response) => response.json())
      .then((data) => setSearchData(data))
      .catch((error) => error);
  };

  const searchedLocation = searchData?.[0]?.name;
  console.log(searchedLocation);
  const currentLocationData = wdata?.current;
  // Safely access nested properties
  const currentTemp = wdata?.current?.temp_c;
  const currentlLocation = wdata?.location;
  const tempCondition = currentLocationData?.condition;
  console.log(wdata);

  return (
    <div className="home flex justify-center flex-col">
      <div className="hero  flex justify-center">
        <div className="search-box w-[90%]">
          <form
            className="find-location"
            onSubmit={(e) => {
              e.preventDefault();
              weatherData(location);
            }}
          >
            <input
              type="text"
              placeholder="Find your location... "
              onChange={(e) => {
                SearchLocation(e.target.value);

                setLocation(e.target.value);
              }}
            />
            <input
              type="submit"
              value="Find"
              id="submit"
              onClick={() => {
                setLocation(e.target.value);
              }}
              className="bg-blue-500"
            />
          </form>
        </div>
      </div>
      <div className="forecast-table  flex justify-center ">
        <div
          className="forecast-container w-[90%] rounded  flex justify-center  flex-wrap -mt-20"
          id="forcast"
        >
          <div className="today forecast  w-full sm:w-1/3  ">
            <div className="forecast-header  text-sm p-1 flex justify-between bg-gray-700">
              <div className="day px-2">Sunday</div>
              <div className=" date px-2">8December</div>
            </div>

            <div
              className="forecast-content text-left bg-gray-800"
              id="current"
            >
              <div className="location">
                {wdata ? <>{currentlLocation.name}</> : `Loading....`}
              </div>
              <div className="degree">
                <div className="num  text-5xl font-bold">
                  {wdata ? (
                    <>
                      <div className="flex justify-between">
                        <div>
                          {currentTemp}
                          <sup>o</sup>C
                        </div>
                        <img src={tempCondition.icon} alt="temp_condition" />
                      </div>
                    </>
                  ) : (
                    `Loading....`
                  )}
                </div>

                <div className="forecast-icon"></div>
              </div>
              <div className="custom">
                {wdata ? (
                  <>
                    <div className="text-blue-500">{tempCondition.text}</div>
                  </>
                ) : (
                  `Loading....`
                )}
              </div>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
