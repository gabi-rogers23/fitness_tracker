import { useState } from "react";
import { getHeaders, BASE_URL } from "../api/api";

function AddRoutineForm({ onAddRoutine, setRoutines }) {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make the POST request to the API using fetch
      const response = await fetch(`${BASE_URL}/routines`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ name: name, goal: goal, isPublic: isPublic }),
      });
      const res = await fetch(`${BASE_URL}/routines`);
      const routs = await res.json();
      setRoutines(routs);

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
  );
}
export default AddRoutineForm;
