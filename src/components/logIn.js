import React from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    const navigate = useNavigate()
    return (<div>
        This is the Log In Page

        <div>Don't have an account?</div>
        <div><button onClick={(e) => {
            e.preventDefault();
            navigate("/register")
        }}>Register Here</button></div>
    </div>)
}

export default LogIn;