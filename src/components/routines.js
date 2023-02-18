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
    })
  };

  useEffect(() => { getAllRoutines() }, []);
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
        <div key={routine.id}>
          <h1>{routine.name}</h1>
          <h2>Created By {routine.creatorName}</h2>
          <p>{routine.goal}</p>
          <span>
            {/* {console.log("name", routine.creatorName, "user", props.user)} */}
            {routine.activities.map((activity) => {
              return (
                <div key={activity.id}>
                  <h1>name {activity.name}</h1>
                  <p>description {activity.description}</p>
                  <p>duration {activity.duration}</p>
                  <p>count {activity.count}</p>
                  {props.user === routine.creatorName ? (
                    <UpdateRoutineActivity routineActivity={activity} onAddRoutine={getAllRoutines} />
                  ) : null}
                </div>
              );
            })}
          </span>
          {props.user === routine.creatorName ? (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log(routine);
                  props.setFeaturedRoutine(routine);
                  navigate("/updateroutine");
                }}
              >
                Edit Routine
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  props.setFeaturedRoutine(routine);
                  deleteRoutine(props.featuredRoutine.id);
                }}
              >
                Delete Routine
              </button>
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default Routines;
