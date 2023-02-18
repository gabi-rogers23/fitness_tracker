import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="homeContainer">
      <div className="homePhoto">
        <div className="homeTag">
          Track your moves. Your way.
          <div
            className="started"
            onClick={(e) => {
              e.preventDefault();
              navigate("/register");
            }}
            onMouseOver={(e)=>{
                e.preventDefault();
                e.target.style.color = 'black'
            }}
            onMouseOut={(e)=>{
                e.preventDefault();
                e.target.style.color = ''
            }}
          >
            Get Started Today >>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
