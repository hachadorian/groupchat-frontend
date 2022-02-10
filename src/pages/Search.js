import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import ChannelCard from "../components/ChannelCard";
import { GETCHANNELS_QUERY } from "../graphql/queries/getChannels";
import Loader from "../components/Loader";
import { GETTOPCHANNELS_QUERY } from "../graphql/queries/getTopChannels";

const Search = () => {
  const [search, setSearch] = useState("");
  const [executeSearch, { called, loading, data }] =
    useLazyQuery(GETCHANNELS_QUERY);
  const getTopChannels = useQuery(GETTOPCHANNELS_QUERY);

  useEffect(() => {
    const timer = setTimeout(() => {
      executeSearch({ variables: { search: search } });
    }, 500);
    return () => clearTimeout(timer);
  }, [search, executeSearch]);

  if (getTopChannels.loading) return <Loader />;

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
          <div>
            <div className="text-xl text-white mb-6">Top communities:</div>
            <div className="md:grid grid-cols-2 md:gap-12">
              {getTopChannels.data.getTopChannels.map((channel) => {
                return <ChannelCard channel={channel} />;
              })}
            </div>
          </div>
        )}
        {called && loading && <Loader />}
        <div className="md:grid grid-cols-2 md:gap-12">
          {called &&
            data &&
            search !== "" &&
            data.getChannels.map((channel) => {
              return <ChannelCard channel={channel} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Search;
