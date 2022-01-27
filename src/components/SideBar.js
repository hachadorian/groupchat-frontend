import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GETALLCHANNELS_QUERY } from "../graphql/queries/getAllChannels";
import { Link } from "react-router-dom";

const SideBar = ({ setChannel }) => {
  const [search, setSearch] = useState("");
  const result = useQuery(GETALLCHANNELS_QUERY);

  if (result.loading) return <div>loading...</div>;

  const filteredChannels =
    search === ""
      ? result.data.getAllChannels
      : result.data.getAllChannels.filter((channel) =>
          channel.name.toLowerCase().includes(search)
        );

  return (
    <div className="flex flex-col">
      <input
        className="w-4/5 p-2 rounded-md"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredChannels.map((channel) => {
        return (
          <Link
            key={channel.id}
            onClick={(e) => setChannel(channel)}
            to={`/channel/${channel.id}`}
          >
            <div className="flex items-center justify-center font-bold text-lg rounded-xl w-12 h-12 mx-4 my-2 bg-white border">
              {/* first letter of channel name */}
              {channel.name.split(" ")[0][0]}
            </div>
            <div>{channel.name.toUpperCase()}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default SideBar;
