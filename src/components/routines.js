import React from "react";
import { useState, useEffect } from "react";
import { BASE_URL, deleteRoutine } from "../api/api";
import AddRoutineForm from "./addRoutineForm";
import { useNavigate } from "react-router-dom";
import UpdateRoutineActivity from "./updateRoutineActivity";
function Routines(props) {
  const [routines, setRoutines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRoutines() {
      try {
        const response = await fetch(`${BASE_URL}/routines`);
        const data = await response.json();
        setRoutines(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchRoutines();
  }, []);

  useEffect(() => {}, [routines]);

  const handleAddRoutine = (newRoutine) => {
    setRoutines([...routines, newRoutine]);
  };

  return (
    <div>
      {props.user}
      {props.isLoggedIn && (
        <AddRoutineForm
          setRoutines={setRoutines}
          onAddRoutine={handleAddRoutine}
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
                  <h1>{activity.name}</h1>
                  <p>{activity.description}</p>
                  <p>{activity.duration}</p>
                  <p>{activity.count}</p>
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
