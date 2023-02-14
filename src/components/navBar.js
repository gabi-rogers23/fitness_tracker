import { React } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <h1>FITNESS TRACKER</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/" end
            style={({ isActive }) => ({ color: isActive ? "green" : "blue" })}>
              HOME
            </NavLink>
          </li>

          <li>
            <NavLink to="/logIn"
            style={({ isActive }) => ({ color: isActive ? "green" : "blue" })}>
              LOG IN
            </NavLink>
          </li>

          <li>
            <NavLink to="/profile"
            style={({ isActive }) => ({ color: isActive ? "green" : "blue" })}>
             PROFILE
            </NavLink>
          </li>

          <li>
            <NavLink to="/routines"
            style={({ isActive }) => ({ color: isActive ? "green" : "blue" })}>
             ROUTINES
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
