import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { Route } from "react-router-dom";
import Channel from "./Channel";

const Home = () => {
  const [channel, setChannel] = useState(null);

  return (
    <div className="h-full grid grid-cols-5">
      <div className="col-span-1 bg-red-400">
        <SideBar setChannel={setChannel} />
      </div>
      <div className="col-span-4">
        <Route path="/home">home</Route>
        <Route exact path="/channel/:id">
          <Channel channel={channel} />
        </Route>
      </div>
    </div>
  );
};

export default Home;
