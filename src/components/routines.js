import React from "react";
import { useState, useEffect } from "react";
import { getRoutines, deleteRoutine } from "../api/api";
import AddRoutineForm from "./addRoutineForm";
import { useNavigate } from "react-router-dom";
import UpdateRoutineActivity from "./updateRoutineActivity";

function Routines(props) {
  const [routines, setRoutines] = useState([]);
  const navigate = useNavigate();

  const getAllRoutines = () => {
    getRoutines().then((routines) => {
      setRoutines(routines);
      console.log(routines);
    });
  };

  useEffect(() => {
    getAllRoutines();
  }, []);
  useEffect(() => {}, [routines]);

  return (
    <div>
      {props.user}
      {props.isLoggedIn && (
        <AddRoutineForm
          setRoutines={setRoutines}
          onAddRoutine={getAllRoutines}
        />
      )}
      <h1>Routines</h1>
      {routines.map((routine) => (
        <div className="routine" key={routine.id}>
          <h1 className="routine-name">{routine.name}</h1>
          <h2 className="routine-creator">Created By {routine.creatorName}</h2>
          <p className="routine-goal">{routine.goal}</p>
          <span>
            {routine.activities.map((activity) => {
              return (
                <div className="activityStyle" key={activity.id}>
                  <h1 className="activity-name">{activity.name}</h1>
                  <p className="activity-description">
                    Description: {activity.description}
                  </p>
                  <p className="activity-duration">
                    Duration: {activity.duration}
                  </p>
                  <p className="activity-count">Count: {activity.count}</p>
                  {props.user === routine.creatorName ? (
                    <UpdateRoutineActivity routineActivity={activity} />
                  ) : null}
                </div>
              );
            })}
          </span>
          {props.user === routine.creatorName ? (
            <>
              <button
                className="edit-button"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(routine);
                  props.setFeaturedRoutine(routine);
                  navigate("/updateroutine");
                }}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={(e) => {
                  e.preventDefault();
                  props.setFeaturedRoutine(routine);
                  deleteRoutine(props.featuredRoutine.id);
                }}
              >
                Delete
              </button>
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default Routines;
