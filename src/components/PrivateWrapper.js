import React from "react";
import { Redirect, Route } from "react-router";
import NavBar from "./NavBar";
import EditProfile from "../pages/EditProfile";
import Profile from "../pages/Profile";

const PrivateWrapper = ({ profile }) => {
  const isAuthenticated = profile && profile.me !== null ? true : false;
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <NavBar profile={profile.me} />
          <Route exact path="/editprofile">
            <EditProfile />
          </Route>
          <Route exact path="/profile">
            <Profile profile={profile.me} />
          </Route>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

export default PrivateWrapper;
