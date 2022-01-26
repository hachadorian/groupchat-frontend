import React from "react";

const Button = ({ text }) => {
  return (
    <button className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-700 my-2">
      {text}
    </button>
  );
};

export default Button;
