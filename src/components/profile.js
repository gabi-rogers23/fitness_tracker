import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { BASE_URL, getUserRoutines, getUserProfile } from "../api/api";

const Profile = ({ setOnline }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRoutines, setUserRoutines] = useState([]);
  // const navigate = useNavigate();

  const currentToken = localStorage.getItem("auth_token");

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const userProfile = await getUserProfile(BASE_URL, currentToken);
        setProfile(userProfile);
        const userRoutines = await getUserRoutines(
          BASE_URL,
          userProfile?.username
        );
        setUserRoutines(userRoutines);
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
              <hr />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
