import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { BASE_URL, getUserProfile } from "../api/api";

const Profile = ({ setOnline }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
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

  const logout = () => {
    setOnline(false);
    navigate('/');
  };
  
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!profile) {
    return <h2>You are not logged in!</h2>;
  }

  return (
    <div className="profile-container">
      <div>
        <h1>Profile</h1>
        <h3>Welcome {profile.username}!</h3>
        <p>Username: {profile.username}</p>
        <p>User ID: {profile.id}</p>
        <div>
          <h4>Routines:</h4>
          {profile.routines?.map((routine, index) => (
            <div key={routine._id} className="profile-routine">
              <h4>Name: {routine.name}</h4>
              <p>Description: {routine.description}</p>
              <p>Activities: {routine.activities.map((activity, index) => (
                <span key={activity._id} className="profile-activity">{activity.name}</span>
              ))}</p>
            </div>
          ))}
        </div>
        <div>
          <h4>My Routines:</h4>
          {profile.myRoutines?.map((myRoutine, index) => (
            <div key={myRoutine._id} className="profile-my-routine">
              <h4>Routine: {myRoutine.routine.name}</h4>
              <p>Frequency: {myRoutine.frequency}</p>
              <p>Days: {myRoutine.days.join(", ")}</p>
              <p>Start Time: {myRoutine.startTime}</p>
            </div>
          ))}
        </div>
        <div>
          <h4>My Activities:</h4>
          {profile.activities?.map((activity, index) => (
            <div key={activity._id} className="profile-activity">
              <h4>Name: {activity.name}</h4>
              <p>Description: {activity.description}</p>
              <p>Routines: {activity.routines.map((routine, index) => (
                <span key={routine._id} className="profile-routine">{routine.name}</span>
              ))}</p>
            </div>
          ))}
        </div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;