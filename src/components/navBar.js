import { React } from "react";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
  return (
    <header>
      <h1>FITNESS TRACKER</h1>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              end
              style={({ isActive }) => ({ color: isActive ? "green" : "blue" })}
            >
              HOME
            </NavLink>
          </li>
          {localStorage.getItem("auth_token") ? (
            <>
              <li>
                <NavLink
                  to="/profile"
                  style={({ isActive }) => ({
                    color: isActive ? "green" : "blue",
                  })}
                >
                  PROFILE
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  onClick={()=>{
                    props.setIsLoggedIn(false)
                    localStorage.clear();
                  }}
                  style={({ isActive }) => ({
                    color: isActive ? "green" : "blue",
                  })} >
                  LOG OUT
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/logIn"
                  style={({ isActive }) => ({
                    color: isActive ? "green" : "blue",
                  })}
                >
                  LOG IN
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  style={({ isActive }) => ({
                    color: isActive ? "green" : "blue",
                  })}
                >
                  REGISTER
                </NavLink>
              </li>
            </>
          )}

          <li>
            <NavLink
              to="/routines"
              style={({ isActive }) => ({ color: isActive ? "green" : "blue" })}
            >
              ROUTINES
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
