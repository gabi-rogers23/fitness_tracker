import { useState, useEffect } from "react";
import { BASE_URL } from "../api/api";
function AddActivityToRoutineForm(props) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch(`${BASE_URL}/activities`);
        const data = await response.json();
        setActivities(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchActivities();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const newActivity = {
      activityId: props.selectedActivityId,
      count: props.count,
      duration: props.duration,
    };

    try {
      const response = await fetch(
        `${BASE_URL}/routines/${props.routineId}/activities`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newActivity),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add activity to routine");
      }
      const data = await response.json();
      props.setActivitiesToAdd([...props.activitiesToAdd, data]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="activity">Activity:</label>
        <select
          name="activity"
          id="activity"
          value={props.selectedActivityId}
          onChange={(event) => props.setSelectedActivityId(event.target.value)}
        >
          <option value="">Select an activity...</option>
          {activities.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="count">Count:</label>
        <input
          type="number"
          id="count"
          name="count"
          value={props.count}
          onChange={(event) => props.setCount(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="duration">Duration (in minutes):</label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={props.duration}
          onChange={(event) => props.setDuration(event.target.value)}
        />
      </div>
      <button type="submit">Add Activity</button>
    </form>
  );
}

export default AddActivityToRoutineForm;
