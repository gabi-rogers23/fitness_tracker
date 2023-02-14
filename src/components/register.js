import React from "react";
import { registerNewUser } from "../api/api";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
    const navigate = useNavigate();
    return (
      <div>
        <div>Create an Account!</div>
        <form>
          <div>Enter your username and password to create an account!</div>
          <br />
          <div>
            USERNAME:
            <input
              required
              value={props.username}
              onChange={(event) => {
                event.preventDefault();
                props.setUsername(event.target.value);
              }}
            ></input>
          </div>
          <br />
          <div>
            PASSWORD:
            <input
              required
              value={props.password}
              onChange={(event) => {
                event.preventDefault();
                props.setPassword(event.target.value);
              }}
            ></input>
          </div>
          <br />
          <button
            onClick={async (event) => {
              event.preventDefault();
              await registerNewUser(props.username, props.password);
              props.setUsername("");
              props.setPassword("");
              navigate("/profile");
            }}>
            Enter
          </button>
        </form>
        <div >
          Already a user? <p />
          <button
            onClick={(event) => {
              event.preventDefault();
              props.setUsername("");
              props.setPassword("");
              navigate("/logIn");
            }}>
            Log In!
          </button>
        </div>
      </div>
    );
}

export default Register;