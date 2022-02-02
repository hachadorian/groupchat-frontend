import React from "react";
import { dateTime } from "../utils/DateTimeFormatting";

const Message = ({ message }) => {
  return (
    <div className="flex w-full py-6 block">
      <div className="mr-4">
        <img
          src={message.image}
          alt=""
          className="border rounded-xl w-12 h-12 mr-4 bg-gray-300"
        />
      </div>
      <div className="flex flex-col">
        <div className="secondary-font grid grid-cols-2">
          <div className="font-bold">{message.name}</div>
          <div className="text-sm flex pt-1 px-4">
            {dateTime(message.created_at)}
          </div>
        </div>
        <div>{message.message}</div>
      </div>
    </div>
  );
};

export default Message;
