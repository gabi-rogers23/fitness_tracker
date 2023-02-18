import { React, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Home,
  NavBar,
  LogIn,
  Profile,
  Routines,
  Register,
  Activities,
  UpdateRoutineActivity,
  AddActivityToRoutineForm,
  UpdateActivity,
  UpdateRoutine,
} from "./components/exports";

const App = () => {
  //Login State
  const [token, setToken] = useState(localStorage.getItem("auth_token"));
  const [featuredActivity, setFeaturedActivity] = useState({});
  // console.log(isLoggedIn)
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [password, setPassword] = useState("");
  const [featuredRoutine, setFeaturedRoutine] = useState([]);

  const storeUser = (username, token) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("username", username);
    setToken(token);
    console.log(username, token);
    setUsername(username);
    navigate("/profile");
  };

  return (
    <div >
      <NavBar token={token} setIsLoggedIn={setToken} />
      <div className="mainContainer">
        <Routes>
          <Route exact strict path="/" element={<Home />} />
          <Route path="/logIn" element={<LogIn storeUser={storeUser} />} />
          <Route
            path="/profile"
            element={
              <Profile
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                isLoggedIn={token}
                setIsLoggedIn={setToken}
              />
            }
          />
          <Route
            path="/routines"
            element={
              <Routines
                AddActivityToRoutineForm={AddActivityToRoutineForm}
                isLoggedIn={token}
                user={username}
                featuredRoutine={featuredRoutine}
                setFeaturedRoutine={setFeaturedRoutine}
              />
            }
          />
          <Route
            path="/updateRoutine"
            element={<UpdateRoutine featuredRoutine={featuredRoutine} />}
          />
          <Route
            path="/updateRoutineActivity"
            element={<UpdateRoutineActivity />}
          />
          <Route
            path="/activities"
            element={
              <Activities
                setFeaturedActivity={setFeaturedActivity}
              />
            }
          />
          <Route
            path="/updateActivity"
            element={<UpdateActivity featuredActivity={featuredActivity} setFeaturedActivity={setFeaturedActivity}/>}
          />
          <Route
            path="/register"
            element={<Register storeUser={storeUser} />}
          />
        </Routes>
      </div>
    </div>
  );
};

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
