import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BASE_URL,
  getUserRoutines,
  getUserProfile,
  deleteRoutine,
} from "../api/api";
import { AddRoutineForm } from "./exports";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRoutines, setUserRoutines] = useState([]);
  const navigate = useNavigate();

  const currentToken = localStorage.getItem("auth_token");

  useEffect(() => {
    setLoading(true)
    getUserProfile(BASE_URL, currentToken)
      .then((userProfile) => {
        setProfile(userProfile);
        updateUserRoutines(userProfile);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentToken]);

  // const logout = () => {
  //   setOnline(false);
  //   navigate('/');
  // };

  const onDeleteRoutine = (removedRoutine) => {
    setUserRoutines(
      userRoutines.filter((routine) => routine.id !== removedRoutine.id)
    );
  };

  const updateUserRoutines = (userProfile) => {
    getUserRoutines(BASE_URL, userProfile.username).then((userRoutines) => {
      setUserRoutines(userRoutines);
    });
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
        <h1>MY ROUTINES</h1>
        <AddRoutineForm onAddRoutine={() => { updateUserRoutines(profile) }} />
        {userRoutines &&
          userRoutines?.map((routine, index) => (
            <div key={routine.id} className="profile-my-routine">
              <h4>Routine: {routine.name}</h4>
              <h5>Goal: {routine.goal}</h5>
              <h5>Activities:</h5>
              <ul>
                {routine.activities?.map((activity) => (
                  <div key={activity.id}>
                    <li>
                      <h6>{activity.name}</h6>
                    </li>
                  </div>
                ))}
              </ul>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log("ROUTINE ID", routine.id);
                  sessionStorage.setItem("FEATURED_ROUTINE", routine.id);
                  navigate("/updateRoutine");
                }}
              >
                Edit Routine
              </button>
              <button
                className="delete-button"
                onClick={(e) => {
                  e.preventDefault();
                  deleteRoutine(routine.id);
                  onDeleteRoutine(routine);
                }}
              >
                Delete
              </button>
              <hr />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
