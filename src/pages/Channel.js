import React from "react";

const Channel = ({ channel }) => {
  return (
    <div className="h-full bg-yellow-500 grid grid-rows-8">
      <div className="w-full pl-8 text-xl bg-green-400 row-span-1">
        {channel.name}
      </div>
      <div className="w-full pl-8 text-xl bg-blue-400 row-span-6">messages</div>
      <div className="w-full text-xl bg-indigo-400 row-span-1">
        <input className="w-4/5" />
        <button className="bg-gray-700 text-white px-2 mx-2">send</button>
      </div>
    </div>
  );
};

export default Channel;
