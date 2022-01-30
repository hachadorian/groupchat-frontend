import { useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { GETALLJOINEDCHANNELS_QUERY } from "../graphql/queries/getAllJoinedChannels";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import UserContext from "../utils/UserContext";
import Dropdown from "./Dropdown";
import { MdSearch } from "react-icons/md";

const SideBar = ({ setChannel }) => {
  const user = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const result = useQuery(GETALLJOINEDCHANNELS_QUERY);

  if (result.loading) return <div>loading...</div>;

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex flex-col text-white font-bold">
        {result.data.getAllJoinedChannels.map((channel) => {
          return (
            <Link
              key={channel.id}
              onClick={(e) => setChannel(channel)}
              to={`/channel/${channel.id}`}
              className="flex items-center "
            >
              <div className="flex items-center justify-center text-lg rounded-xl w-12 h-12 mx-4 my-2 dark">
                {/* first letter of channel name */}
                {channel.name.split(" ")[0][0]}
              </div>
              <div className="secondary-font">{channel.name.toUpperCase()}</div>
            </Link>
          );
        })}
        <div
          className="flex items-center cursor-pointer"
          onClick={(e) => setIsOpen(true)}
        >
          <div className="w-12 h-12 rounded-xl mx-4 my-2 bg-green-500 flex items-center justify-center">
            +
          </div>
          <div className="secondary-font">ADD CHANNEL</div>
        </div>
        <Link className="flex items-center" to="/search">
          <div className="flex items-center justify-center text-lg rounded-xl w-12 h-12 mx-4 my-2 bg-pink-500">
            <MdSearch />
          </div>
          <div className="secondary-font">SEARCH</div>
        </Link>
      </div>
      <div className="w-full mt-auto flex items-center justify-center bottom-0 darkest p-4 text-white">
        <img
          src={user.image}
          alt=""
          className="border rounded-xl w-12 h-12 mr-4 bg-gray-300"
        />
        {window.screen.width > 640 ? <b>{user.name}</b> : null}
        <Dropdown />
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default SideBar;
