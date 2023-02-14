import React from "react";
import { useNavigate } from "react-router-dom";
import { logIn } from "../api/api";

const LogIn = (props) => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="subHeader"> Log In! </div>
      <form className="logInForm">
        <div>
          USERNAME:
          <input
            required
            value={props.username}
            onChange={(e) => {
              e.preventDefault();
              props.setUsername(e.target.value);
            }}
          ></input>
        </div>
        <br />
        <div>
          PASSWORD:
          <input
            required
            type="password"
            value={props.password}
            onChange={(e) => {
              e.preventDefault();
              props.setPassword(e.target.value);
            }}
          ></input>
        </div>
        <div className="logInButton">
          <button
            onClick={async (e) => {
              e.preventDefault();
              const user = await logIn(props.username, props.password);
              console.log(user);
              if (user.error) {
                alert(user.message);
              } else {
                props.setUsername("");
                props.setPassword("");
                props.setIsLoggedIn(true);
                navigate("/profile");
              }
            }}
          >
            ENTER
          </button>
        </div>
      </form>

      <div className="logInUserQ">
        Not already a user? <p />
        <button
          className="logInCreateAccount"
          onClick={(e) => {
            e.preventDefault();
            props.setUsername("");
            props.setPassword("");
            navigate("/register");
          }}
        >
          Create an Account
        </button>
      </div>
    </div>
  );
};

export default LogIn;
