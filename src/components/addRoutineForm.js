import { useState } from "react";
import { getHeaders, BASE_URL } from "../api/api";

function AddRoutineForm({ onAddRoutine, setButtonClick }) {
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
      console.log(response);
      setName("");
      setGoal("");
      setIsPublic(false);
      setButtonClick(false);
      onAddRoutine();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form className="formAdd" onSubmit={handleSubmit}>
        <label className="label">
          Name:
          <input
            className="input"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <br />
        <label className="label">
          Goal:
          <input
            className="input"
            type="text"
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
          />
        </label>
        <br />
        <label className="label">
          Public:
          <input
            className="input"
            type="checkbox"
            checked={isPublic}
            onChange={(event) => setIsPublic(event.target.checked)}
          />
        </label>
        <br />
        <button className="buttonAdd" type="submit">
          Add Routine
        </button>
        <button onClick={((e)=>{
          e.preventDefault()
          setButtonClick(false)
        })}>Cancel</button>
      </form>
    </div>
  );
}

export default AddRoutineForm;
