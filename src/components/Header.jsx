import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo@2x.png";
import Button from "./Button.jsx"; // This should match the file's actual name
import "../App.css";

const Header = () => {
  const [activeBtn, setActiveBtn] = useState(`home`);

  const handleActiveBtn = (btn) => {
    setActiveBtn(btn);
  };

  return (
    <div className="header bg-gray-900 text-white p-4  flex justify-center  items-center">
      <div className="flex justify-between items-center w-[95%] ">
        <div className="logo ">
          <img src={logo} alt="Logo" className="w-24 h-auto" />
          <h3> Weather App</h3>
        </div>
        <div className="flex justify-between items-center  space-x-7 py-4">
          <Link to="/">
            <Button
              btnName="Home"
              onClick={handleActiveBtn}
              activeBtn={activeBtn}
            />
          </Link>
          <Link to="/">
            <Button
              btnName="News"
              onClick={handleActiveBtn}
              activeBtn={activeBtn}
            />
          </Link>
          <Link to="/">
            <Button
              btnName="Live Camera"
              onClick={handleActiveBtn}
              activeBtn={activeBtn}
            />
          </Link>
          <Link to="">
            <Button
              btnName="Photos"
              onClick={handleActiveBtn}
              activeBtn={activeBtn}
            />
          </Link>
          <Link to="/contact">
            <Button
              btnName="Contact"
              onClick={handleActiveBtn}
              activeBtn={activeBtn}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
