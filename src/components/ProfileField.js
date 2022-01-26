import React from "react";

const ProfileField = ({ label, value }) => {
  if (label === "__typename" || label === "id") {
    return null;
  } else if (label === "image") {
    return (
      <div className="grid grid-cols-3 py-2 px-12">
        <div className="text-gray-500 pt-8">{label}</div>
        <div className="md:col-span-2">
          <img
            src={value}
            alt=""
            className="h-24 w-24 md:w-36 md:h-36 border rounded-2xl bg-gray-300"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-3 py-12 px-12">
        <div className="text-gray-500">{label}</div>
        <div className="col-span-2">
          <span>{label === "password" ? "*******" : value}</span>
        </div>
      </div>
    );
  }
};

export default ProfileField;
