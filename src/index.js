import { React, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  NavBar,
  LogIn,
  Profile,
  Routines,
  Register,
  Activities,
  UpdateActivity,
} from "./components/exports";

const App = () => {
  //Login State
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("auth_token")
  );
  const [featuredActivity, setFeaturedActivity] = useState({});
  // console.log(isLoggedIn)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <BrowserRouter>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div>
          <Routes>
            <Route exact strict path="/" element={<Home />} />
            <Route
              path="/logIn"
              element={
                <LogIn
                  username={username}
                  setUsername={setUsername}
                  password={password}
                  setPassword={setPassword}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
            <Route path="/profile" element={
            <Profile
                  username={username}
                  setUsername={setUsername}
                  password={password}
                  setPassword={setPassword}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              } 
            />
            <Route path="/routines" element={<Routines />} />
            <Route
              path="/activities"
              element={
                <Activities
                  isLoggedIn={isLoggedIn}
                  setFeaturedActivity={setFeaturedActivity}
                />
              }
            />
            <Route
              path="/updateActivity"
              element={<UpdateActivity featuredActivity={featuredActivity} />}
            />
            <Route
              path="/register"
              element={
                <Register
                  username={username}
                  setUsername={setUsername}
                  password={password}
                  setPassword={setPassword}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("app");
const root = createRoot(container);

root.render(<App />);
