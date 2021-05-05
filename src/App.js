import React from "react";
import Header from "./components/header/Header";
import Home from "./components/pages/home/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthProvider } from "./components/contexts/AuthContext";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import PrivateRoute from "./components/contexts/PrivateRoute";
import Profile from "./components/pages/profile/Profile";
import Main from "./components/pages/create-profile/Main";

export default () => {
  return (
    <div style={{ overflow: "hidden" }}>
      <AuthProvider>
        <Header />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/sign-up" component={Signup} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/create-profile" component={Main} />
            <PrivateRoute exact path="/profile" component={Profile} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
};
