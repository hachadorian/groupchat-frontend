import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import DropDown from "../components/Dropdown";

const Test = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <div className="w-full h-screen bg-green-400 flex">
      <div
        className={`h-full ${
          toggled ? "w-3/4" : "w-0"
        } md:w-96 bg-red-400 font-bold flex flex-col`}
      >
        <div className="overflow-auto">
          <div>Client-Side</div>
          <div>Search</div>
          <div>Home</div>
        </div>
        <div className="mt-auto flex items-center justify-center">
          <img
            src={""}
            alt=""
            className="border rounded-xl w-12 h-12 my-2 mx-2 bg-gray-300"
          />
          <DropDown name={"Tyler Hachadorian"} />
        </div>
      </div>
      <div className="h-full w-full bg-blue-400">
        <FaBars
          className="m-8 visible md:invisible cursor-pointer"
          onClick={() => {
            setToggled(!toggled);
            console.log(toggled);
          }}
        />
      </div>
    </div>
  );
};

export default Test;
