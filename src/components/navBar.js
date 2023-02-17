import { React } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="nameLogo">
        <img src="/images/logo.png" alt=""></img>
        <div
          className="name"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
            <NavLink to="/" end />
          }}
        >
          FITNESS TRAC.KR
        </div>
      </div>
<div className="mNavDiv">
      <NavLink
        to="/routines"
        className={(navData) => (navData.isActive ? "active" : "middleNav")}
      >
        Routines
      </NavLink>

      <NavLink
        to="/activities"
        className={(navData) => (navData.isActive ? "active" : "middleNav")}
      >
        Activities
      </NavLink>
      </div>
      <div className="rNavDiv">

      {localStorage.getItem("auth_token") ? (
        <>
          <NavLink
            to="/profile"
            className={(navData) => (navData.isActive ? "activeR" : "navR")}
            >
            Profile
          </NavLink>

          <NavLink
            to="/logIn"
            className={(navData) => (navData.isActive ? "activeR" : "navR")}
            onClick={() => {
              props.setIsLoggedIn(false);
              localStorage.clear();
              console.log(localStorage.getItem("auth_token"));
            }}
            >
            LOG OUT
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            className={(navData) => (navData.isActive ? "activeR" : "navButton")}
            to="/logIn"
            >
            LOG IN
          </NavLink>

          <NavLink
            className={(navData) => (navData.isActive ? "activeR" : "navButton")}
            to="/register"
            >
            REGISTER
          </NavLink>
        </>
      )}
      </div>
    </header>
  );
};

export default NavBar;
