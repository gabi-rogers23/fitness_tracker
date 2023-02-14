import { useState, useEffect } from "react";
import { BASE_URL } from "../api/api";

function Routines() {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    async function fetchRoutines() {
      try {
        const response = await fetch(`${BASE_URL}/api/routines`);
        const data = await response.json();
        setRoutines(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchRoutines();
  }, []);

  return (
    <div>
      {routines.map((routine) => (
        <div key={routine.id}>
          <h2>{routine.name}</h2>
          <p>{routine.goal}</p>
          <p>{routine.creatorId}</p>
        </div>
      ))}
    </div>
  );
}

export default Routines;
