import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logIn } from "../api/api";

const LogIn = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="tabContainer">
      <div className="createAccount"> Log In! </div>
      <br />
      <br />
      <form>
        <div className="registerForm">
          USERNAME:
          <input
            required
            value={username}
            onChange={(e) => {
              e.preventDefault();
              setUsername(e.target.value);
            }}
          ></input>
          <br />
          PASSWORD:
          <input
            required
            type="password"
            value={password}
            onChange={(e) => {
              e.preventDefault();
              setPassword(e.target.value);
            }}
          ></input>
          <button
            onClick={async (e) => {
              e.preventDefault();
              const user = await logIn(username, password);
              console.log(user);
              if (user.error) {
                alert(user.message);
              } else {
                props.storeUser(username, user.token);
              }
            }}
          >
            ENTER
          </button>
        </div>
      </form>

      <div className="formQ">
        Not already a user? <br />
        <button
          className="logInCreateAccount"
          onClick={(e) => {
            e.preventDefault();
            setUsername("");
            setPassword("");
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
