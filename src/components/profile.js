import React, { useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom";
import { BASE_URL, getUserProfile } from "../api/api";

const Profile = ({ setOnline }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();
  
  const currentToken = localStorage.getItem("auth_token");

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const userProfile = await getUserProfile(BASE_URL, currentToken);
        setProfile(userProfile);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    isLoggedIn();
  }, [currentToken]);

  // const logout = () => {
  //   setOnline(false);
  //   navigate('/');
  // };
  
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!profile) {
    return <h2>You are not logged in!</h2>;
  }

  
  return (
    <div className="profile-container">
        <div>
          <h1>MY ROUTINES</h1>
          {profile.routine?.map((routine, index) => (
            <div key={routine._id} className="profile-my-routine">
              {/* <h4>Routine: {routine.routines.name}</h4> */}
            </div>
          ))}
        </div>
      </div>
  );
};

export default Profile;