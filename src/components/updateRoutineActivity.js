import React, { useState, useEffect } from "react";
import { BASE_URL, deleteRoutineActivity, getHeaders } from "../api/api";

function UpdateRoutineActivity({ routineActivity, onUpdateActivity }) {
  const [activity, setActivity] = useState(routineActivity)
  const [count, setCount] = useState(activity.count);
  const [duration, setDuration] = useState(activity.duration);

  useEffect(() => {
    console.log("ROUTINE ACTIVITY IN UPDATE ROUTINE ACTIVITY", activity)
    setCount(activity.count)
    setDuration(activity.duration)
  }, [activity]);

  const handleCountChange = (e) => {
    setCount(parseInt(e.target.value));
  };

  const handleDurationChange = (e) => {
    setDuration(parseInt(e.target.value));
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault()

      // await onAddRoutine()

      const response = await fetch(
        `${BASE_URL}/routine_activities/${routineActivity.routineActivityId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ count: count, duration: duration }),
          headers: getHeaders()
        }
      );
      const data = await response.json();
      onUpdateActivity(data)
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="number" value={count} onChange={handleCountChange} />
      <input type="number" value={duration} onChange={handleDurationChange} />
      <button onClick={handleUpdate}>Update Activity</button>
      <button onClick={(async (e)=>{
        e.preventDefault();
        await deleteRoutineActivity(routineActivity.routineActivityId)
      })}>Delete Activity</button>
    </div>
  );
}

export default UpdateRoutineActivity;
