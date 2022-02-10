import React from "react";
import { dateTime } from "../utils/DateTimeFormatting";

const Message = ({ message }) => {
  return (
    <div className="flex w-full pb-6 pt-5 secondary-font">
      <div className="mr-2 md:mr-4 flex ">
        <img
          src={message.image}
          alt=""
          className="border rounded-xl w-12 h-12 mr-4 bg-gray-300"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex">
          <div className="font-bold text-sm md:text-base">{message.name}</div>
          <div className="text-sm pt-1 px-4">
            {dateTime(message.created_at)}
          </div>
        </div>
        <div className="pt-4 text-white">{message.message}</div>
      </div>
    </div>
  );
};

export default Message;
