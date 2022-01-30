import React from "react";
import { IoSend } from "react-icons/io5";

const Channel = ({ channel }) => {
  return (
    <div className="dark h-full relative">
      <div className="absolute top-0 w-full text-white font-bold shadow-bottom">
        <div className="px-14 py-4">{channel.name}</div>
      </div>
      <div className="h-full overflow-auto flex items-end py-16">messages</div>
      <div className="absolute bottom-0 w-full flex justify-center">
        <div className="px-14 py-4 w-full">
          <input
            className="w-11/12 p-3 rounded input-bg text-white w-full"
            placeholder="Type a message here"
          />
          <button className="bg-blue-500 hover:bg-blue-600 -ml-10 h-8 w-8 text-white rounded pl-2">
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Channel;
