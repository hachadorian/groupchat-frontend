import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import ChannelCard from "../components/ChannelCard";
import { GETALLCHANNELS_QUERY } from "../graphql/queries/getAllChannels";
import Loader from "../components/Loader";

const Search = () => {
  const [search, setSearch] = useState("");
  const result = useQuery(GETALLCHANNELS_QUERY);

  if (result.loading) return <Loader />;

  const channels =
    search === ""
      ? result.data.getAllChannels
      : result.data.getAllChannels.filter((channel) =>
          channel.name.toLowerCase().includes(search)
        );

  return (
    <div className="dark h-full overflow-auto">
      <div className="bg-blue-600">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0c1fd8"
            fillOpacity="1"
            d="M0,64L26.7,85.3C53.3,107,107,149,160,154.7C213.3,160,267,128,320,144C373.3,160,427,224,480,234.7C533.3,245,587,203,640,192C693.3,181,747,203,800,197.3C853.3,192,907,160,960,128C1013.3,96,1067,64,1120,64C1173.3,64,1227,96,1280,90.7C1333.3,85,1387,43,1413,21.3L1440,0L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"
          ></path>
        </svg>
      </div>
      <div className="px-14 pb-14">
        <div className="text-center text-white text-2xl my-4">
          <div>Find your home!</div>
          <div className="text-base secondary-font">
            Search through all of our wonderful communities!
          </div>
        </div>
        <div className="py-4 w-full">
          <input
            className="w-11/12 p-3 rounded input-bg text-white w-full"
            placeholder="Search for a channel here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {search === "" && (
          <div className="text-xl text-white mb-6">Top communities:</div>
        )}
        <div className="grid grid-cols-3 gap-4">
          {channels.slice(0, 6).map((channel) => {
            return <ChannelCard channel={channel} key={channel.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
