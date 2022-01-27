import React from "react";
import Dropdown from "./Dropdown";

const NavBar = ({ profile }) => {
  return (
    <div className="w-full grid grid-cols-2">
      <div className="flex justify-start m-2 pl-10 md:pl-20 pt-10 md:pt-6"></div>
      <div className="flex justify-end m-2 md:pr-20 pt-6 items-center">
        <img
          src={profile.image}
          alt=""
          className="border rounded-xl w-12 h-12 mx-4 bg-gray-300"
        />
        {window.screen.width > 640 ? <b>{profile.name}</b> : null}
        <Dropdown />
      </div>
    </div>
  );
};

export default NavBar;
