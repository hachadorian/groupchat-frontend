import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { Route } from "react-router-dom";
import Channel from "./Channel";
import Search from "./Search";
import EditProfile from "./EditProfile";
import Profile from "./Profile";
import { UserProvider } from "../utils/UserContext";

const Home = () => {
  const [channel, setChannel] = useState(null);

  return (
    <UserProvider>
      <div className="h-screen grid grid-cols-5 rubik">
        <div className="col-span-1 darker">
          <SideBar setChannel={setChannel} />
        </div>
        <div className="col-span-4 overflow-auto">
          <Route exact path="/editprofile">
            <EditProfile />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/home">
            home
          </Route>
          <Route exact path="/channel/:id">
            <Channel channel={channel} />
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
