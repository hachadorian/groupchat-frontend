import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { Link, Route } from "react-router-dom";
import Channel from "./Channel";
import Search from "./Search";
import EditProfile from "./EditProfile";
import Profile from "./Profile";
import { UserProvider } from "../utils/UserContext";
import { FaBars } from "react-icons/fa";

const Home = () => {
  const [channel, setChannel] = useState(null);
  const [members, setMembers] = useState(null);
  const [toggled, setToggled] = useState(false);

  return (
    <UserProvider>
      <div className="w-full h-screen flex overflow-x-hidden">
        <SideBar
          setChannel={setChannel}
          members={members}
          channel={channel}
          toggled={toggled}
        />
        <div className="h-full dark min-w-full md:min-w-0 w-full">
          <FaBars
            className="m-5 text-white cursor-pointer visible md:invisible absolute top-0"
            onClick={() => {
              setToggled(!toggled);
            }}
            style={{ zIndex: 1000000 }}
          />
          <Route exact path="/editprofile">
            <EditProfile />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/home">
            <div className="h-full flex items-center justify-center">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 w-10/12 md:w-1/2 p-6 md:p-20 text-center rounded-lg text-white">
                <div className="font-bold text-5xl py-4">Welcome</div>
                <div>
                  Whether you're part of a school club, gaming group, worldwide
                  art community, or just a handful of friends that want to spend
                  time together, our application makes it easy to talk every day
                  and hang out more often.
                </div>
                <Link to="/search">
                  <div className="rounded-lg text-black bg-white p-4 m-4 hover:bg-gray-100">
                    Search for a channel
                  </div>
                </Link>
              </div>
            </div>
          </Route>
          <Route exact path="/channel/:id">
            <Channel channel={channel} setMembers={setMembers} />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
        </div>
      </div>
    </UserProvider>
  );
};

export default Home;
