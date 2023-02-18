import { React, useState } from "react";
import { registerNewUser } from "../api/api";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="tabContainer">
      <div className="createAccount">Create an Account!</div>
      <p />
      <form>
        <div>Enter your username and password to create an account!</div>
        <br />
        <br />
        <div className="registerForm">
          USERNAME:
          <input
            required
            value={username}
            onChange={(event) => {
              event.preventDefault();
              setUsername(event.target.value);
            }}
          ></input>
          <br />
          PASSWORD:
          <input
            required
            value={password}
            onChange={(event) => {
              event.preventDefault();
              setPassword(event.target.value);
            }}
          ></input>
          <br />
          <button
            onClick={async (event) => {
              event.preventDefault();
              const newUser = await registerNewUser(username, password);
              console.log("NEW USER MESSAGE" + newUser.message);
              if (newUser.error) {
                alert(newUser.message);
              } else {
                props.storeUser(username, newUser.token);
              }
            }}
          >
            Enter
          </button>
        </div>
      </form>
      <div className="formQ">
        Already a user? <br />
        <button
          onClick={(event) => {
            event.preventDefault();
            setUsername("");
            setPassword("");
            navigate("/logIn");
          }}
        >
          Log In!
        </button>
      </div>
    </div>
  );
};

export default Register;
