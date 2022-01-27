import React from "react";
import Login from "./pages/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./pages/Register";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import { UserProvider } from "./utils/UserContext";
import PrivateWrapper from "./components/PrivateWrapper";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="h-screen flex justify-center items-center">
            <Login />
          </div>
        </Route>
        <Route exact path="/change-password/:token">
          <div className="h-screen flex justify-center items-center">
            <ChangePassword />
          </div>
        </Route>
        <Route exact path="/forgot-password">
          <div className="h-screen flex justify-center items-center">
            <ForgotPassword />
          </div>
        </Route>
        <Route exact path="/register">
          <div className="h-screen flex justify-center items-center">
            <Register />
          </div>
        </Route>
        <UserProvider>
          <PrivateWrapper>
            <Route exact path="/editprofile">
              <EditProfile />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Home />
          </PrivateWrapper>
        </UserProvider>
      </Switch>
    </Router>
  );
};

export default App;
