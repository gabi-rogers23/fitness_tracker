import { React } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
  const navigate = useNavigate()
  return (
    <header>
      <div className="nameLogo">
        <img src="/images/logo.png" alt=""></img>
        <div className="name" onClick={((e)=>{
          e.preventDefault()
          navigate("/") 
        })}>FITNESS TRAC.KR</div>
      </div>
      <nav>
        <div>
          <NavLink to="/" end />
        </div>
        <div className="centerNav">
          <NavLink to="/routines" className={(navData) => navData.isActive ? "active" : ""}>Routines</NavLink>
        </div>

        <div className="centerNav">
          <NavLink to="/activities" className={(navData) => navData.isActive ? "active" : ""}>Activities</NavLink>
        </div>
        </nav>
        <nav className="rightNav">
        {localStorage.getItem("auth_token") ? (
          <>
            <div>
              <NavLink to="/profile" className={(navData) => navData.isActive && "activeR"}>Profile</NavLink>
            </div>
            <div>
              <NavLink
                to="/logIn"
                className={(navData) => navData.isActive ? "activeR" : ""}
                onClick={() => {
                  props.setIsLoggedIn(false);
                  localStorage.clear();
                  console.log(localStorage.getItem("auth_token"));
                }}
              >
                LOG OUT
              </NavLink>
            </div>
          </>
        ) : (
          <>
            <div>
              <NavLink className={(navData) => navData.isActive ? "activeR" : ""} to="/logIn">LOG IN</NavLink>
            </div>
            <div>
              <NavLink className={(navData) => navData.isActive ? "activeR": ""} to="/register">REGISTER</NavLink>
            </div>
            
          </>
        )}

</nav>
      
    </header>
  );
};

export default NavBar;
