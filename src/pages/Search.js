import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GETALLCHANNELS_QUERY } from "../graphql/queries/getAllChannels";

const Search = () => {
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
    <div>
      <div>
        <input
          className="border border-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {search &&
        filteredChannels.map((channel) => {
          return <div>{channel.name}</div>;
        })}
    </div>
  );
};

export default Search;
