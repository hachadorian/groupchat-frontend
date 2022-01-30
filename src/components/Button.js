import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button
      className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 my-2"
      onClick={onClick || null}
    >
      {text}
    </button>
  );
};

export default Button;
