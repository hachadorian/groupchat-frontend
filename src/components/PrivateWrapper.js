import React, { useContext } from "react";
import { Redirect } from "react-router";
import NavBar from "../components/NavBar";

import UserContext from "../utils/UserContext";

const PrivateWrapper = (props) => {
  const user = useContext(UserContext);
  const isAuthenticated = user !== null ? true : false;

  return (
    <div>
      {isAuthenticated ? (
        <div className="flex flex-col h-screen">
          <NavBar profile={user} />
          {props.children}
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

export default PrivateWrapper;
