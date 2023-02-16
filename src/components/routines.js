import React from "react";
import { useState, useEffect } from "react";
import { BASE_URL } from "../api/api";
import AddRoutineForm from "./addRoutineForm";

function Routines() {
  const [routines, setRoutines] = useState([]);

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
      <AddRoutineForm
        setRoutines={setRoutines}
        onAddRoutine={handleAddRoutine}
      />
      <h1>Routines</h1>
      {routines.map((routine) => (
        <div key={routine.id}>
          <h1>{routine.name}</h1>
          <h2>Created By {routine.creatorName}</h2>
          <p>{routine.goal}</p>
          <p>
            {routine.activities.map((activity) => {
              return (
                <div key={activity.id}>
                  <h1>{activity.name}</h1>
                  <p>{activity.description}</p>
                  <p>{activity.duration}</p>
                  <p>{activity.count}</p>
                </div>
              );
            })}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Routines;
