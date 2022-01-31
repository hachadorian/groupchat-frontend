import React from "react";

const ChannelCard = ({ channel }) => {
  const borderStyle = {
    borderColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
  };

  return (
    <div className="darker text-white flex flex-col items-center rounded-lg p-12 text-center">
      <div className="font-bold">{channel.name}:</div>
      <div
        className="flex items-center justify-center text-3xl rounded-full border-4 w-24 h-24 mx-4 my-2 dark"
        style={borderStyle}
      >
        {/* first letter of channel name */}
        {channel.name.split(" ")[0][0]}
      </div>
      <div className="my-2">
        <div>
          {channel.member_count}{" "}
          {channel.member_count === 1 ? "member" : "members"}
        </div>
      </div>
      <div className="w-full my-2">
        {channel.is_member ? (
          <button
            className="text-green-500 border-2 border-green-500 p-2 w-full rounded disabled"
            disabled={true}
          >
            Joined ✓
          </button>
        ) : (
          <button className="bg-blue-500 p-2 w-full rounded hover:bg-blue-600">
            Join
          </button>
        )}
      </div>
      <div className="secondary-font my-2">{channel.description}</div>
    </div>
  );
};

export default ChannelCard;
