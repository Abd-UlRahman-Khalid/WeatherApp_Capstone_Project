import React from "react";

const Button = ({ btnName, activeBtn, onClick }) => {
  return (
    <button
      onClick={() => onClick(btnName)}
      className={`
        px-4 py-2 
        ${
          activeBtn === btnName &&
          "border border-blue-500 rounded-full text-blue-500"
        }
        hover:border hover:border-blue-500 hover:rounded-full hover:text-blue-500 transition
      `}
    >
      {btnName}
    </button>
  );
};

export default Button;
