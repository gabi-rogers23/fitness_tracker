import { React } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, NavBar, LogIn, Profile, Routines } from "./components/exports";

const App = () => {
  // Login State
  //   const [isLoggedIn, setIsLoggedIn] = useState(
  //     localStorage.getItem("auth_token")
  //   );
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <div>
          <Routes>
            <Route exact strict path="/" element={<Home />} />
            <Route path="/logIn" element={<LogIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/routines" element={<Routines />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("app");
const root = createRoot(container);

root.render(<App />);
