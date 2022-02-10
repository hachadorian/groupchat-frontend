import { useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { GETALLJOINEDCHANNELS_QUERY } from "../graphql/queries/getAllJoinedChannels";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import UserContext from "../utils/UserContext";
import Dropdown from "./Dropdown";
import { MdSearch } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { FaCrown } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import Loader from "./Loader";

const SideBar = ({ setChannel, members, channel, toggled }) => {
  const user = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const result = useQuery(GETALLJOINEDCHANNELS_QUERY);
  const [channelSideBar, setChannelSideBar] = useState(false);

  if (result.loading) return <Loader />;

  return (
    <div
      className={`h-full ${
        toggled ? "min-w-max md:min-w-0" : "w-0"
      } md:w-96 darker font-bold flex flex-col text-white`}
    >
      <div className="overflow-auto">
        {channelSideBar && members ? (
          <div className="px-4">
            <button
              onClick={(e) => setChannelSideBar(false)}
              className="flex pt-4"
            >
              <IoIosArrowBack className="mt-1" />
              Back
            </button>
            <div className="font-bold text-lg mt-8">{channel.name}</div>
            <div className="secondary-font">{channel.description}</div>
            <div className="mt-8 font-bold">Members</div>
            {members.map((member) => {
              return (
                <div key={member.user_id}>
                  <div className="flex items-center my-4">
                    <img
                      src={member.image}
                      alt=""
                      className="border rounded-xl w-12 h-12 mr-4 bg-gray-300"
                    />
                    {member.is_creator && (
                      <FaCrown className="mr-1 text-yellow-400" />
                    )}
                    {member.name}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="font-bold">
            {result.data.getAllJoinedChannels.map((channel) => {
              return (
                <Link
                  key={channel.id}
                  onClick={(e) => {
                    setChannel(channel);
                    setChannelSideBar(true);
                  }}
                  to={`/channel/${channel.id}`}
                  className="flex items-center "
                >
                  <div className="flex items-center justify-center text-lg rounded-xl w-12 h-12 mx-4 my-2 dark">
                    {/* first letter of channel name */}
                    {channel.name.split(" ")[0][0]}
                  </div>
                  <div className="secondary-font">
                    {channel.name.toUpperCase()}
                  </div>
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
            <Link className="flex items-center" to="/home">
              <div className="flex items-center justify-center text-lg rounded-xl w-12 h-12 mx-4 my-2 bg-indigo-500">
                <AiOutlineHome />
              </div>
              <div className="secondary-font">HOME</div>
            </Link>
          </div>
        )}
      </div>
      <div className="mt-auto flex items-center justify-center darkest">
        <img
          src={user.image}
          alt="profilepicture"
          className="border rounded-xl w-12 h-12 my-2 mx-2 bg-gray-300"
        />
        <Dropdown name={"Tyler Hachadorian"} />
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default SideBar;
