import React from "react";
import { BiError } from "react-icons/bi";

const Error = ({ message }) => {
  return (
    <div>
      {message !== "" ? (
        <div className="text-red-500 flex flex-row items-center">
          <BiError className="mt-1 mr-2" />
          {message}
        </div>
      ) : null}
    </div>
  );
};

export default Error;
