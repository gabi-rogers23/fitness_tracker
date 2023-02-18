import { useState } from "react";
import { getHeaders, BASE_URL } from "../api/api";
import AddActivityToRoutineForm from "./addActivityToRoutineForm";

function AddRoutineForm({ onAddRoutine, setRoutines }) {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [activitiesToAdd, setActivitiesToAdd] = useState([]);
  const [selectedActivityId, setSelectedActivityId] = useState("");
  const [count, setCount] = useState(1);
  const [duration, setDuration] = useState(0);
  const [routData, setRoutData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make the POST request to the API using fetch
      const response = await fetch(`${BASE_URL}/routines`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ name: name, goal: goal, isPublic: isPublic }),
      });
      console.log(response);
      const res = await fetch(`${BASE_URL}/routines`);
      const routs = await res.json();
      const routData = await response.json();

      setRoutData(routData);
      setRoutines(routs);

      const resp = await fetch(
        `${BASE_URL}/routines/${routData.id}/activities`,
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({
            activityId: selectedActivityId,
            count: count,
            duration: duration,
          }),
        }
      );
      const addActRout = await resp.json();
      // onAddActivityToRoutine(addActRout);

      return { addActRout };
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Goal:
          <input
            type="text"
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
          />
        </label>
        <br />
        <label>
          Public:
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(event) => setIsPublic(event.target.checked)}
          />
        </label>
        <br />
        <button type="submit">Add Routine</button>
      </form>

      <AddActivityToRoutineForm
        activitiesToAdd={activitiesToAdd}
        setActivitiesToAdd={setActivitiesToAdd}
        count={count}
        setCount={setCount}
        duration={duration}
        setDuration={setDuration}
        selectedActivityId={selectedActivityId}
        setSelectedActivityId={setSelectedActivityId}
        routData={routData}
      />
    </div>
  );
}

export default AddRoutineForm;
