import React, { useState } from "react";
import { BASE_URL, deleteRoutineActivity, getHeaders } from "../api/api";

function UpdateRoutineActivity({
  routineActivity,
  onUpdateActivity,
  onRemovedActivity,
}) {
  const [count, setCount] = useState(routineActivity.count);
  const [duration, setDuration] = useState(routineActivity.duration);

  const handleCountChange = (e) => {
    setCount(parseInt(e.target.value));
  };

  const handleDurationChange = (e) => {
    setDuration(parseInt(e.target.value));
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();

      // await onAddRoutine()

      const response = await fetch(
        `${BASE_URL}/routine_activities/${routineActivity.routineActivityId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ count: count, duration: duration }),
          headers: getHeaders(),
        }
      );
      const data = await response.json();
      onUpdateActivity(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="updateRoutineActivity">
      <input type="number" value={count} onChange={handleCountChange} />
      <input type="number" value={duration} onChange={handleDurationChange} /><br/>
      <button onClick={handleUpdate}>Update Activity</button>
      <button
        onClick={async (e) => {
          e.preventDefault();
          await deleteRoutineActivity(routineActivity.routineActivityId);
          onRemovedActivity(routineActivity);
        }}
      >
        Delete Activity
      </button><p/>
    </div>
  );
}

export default UpdateRoutineActivity;
