import React, { useState } from "react";
import { BASE_URL } from "../api/api";

function UpdateRoutineActivity({ routineActivity }) {
  const [count, setCount] = useState(routineActivity.count);
  const [duration, setDuration] = useState(routineActivity.duration);

  const handleCountChange = (e) => {
    setCount(parseInt(e.target.value));
  };

  const handleDurationChange = (e) => {
    setDuration(parseInt(e.target.value));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/routine_activities/${routineActivity.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ count, duration }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="number" value={count} onChange={handleCountChange} />
      <input type="number" value={duration} onChange={handleDurationChange} />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default UpdateRoutineActivity;
