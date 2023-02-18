import React, { useState, useEffect } from "react";
import { editRoutine, getRoutines } from "../api/api"; // import the API function to edit a routine
import { useNavigate } from "react-router-dom";
import { AddActivityToRoutineForm, UpdateRoutineActivity } from "./exports";

const UpdateRoutine = (props) => {
  const [name, setName] = useState(props.featuredRoutine.name);
  const [goal, setGoal] = useState(props.featuredRoutine.goal);
  const [isPublic, setIsPublic] = useState(props.featuredRoutine.isPublic);
  const [activities, setActivies] = useState(props.featuredRoutine.activities);

  const navigate = useNavigate();
  useEffect(() => {}, [activities]);

  const onUpdateActivity = (editedActivity) => {
    const newActivities = [...activities];
    const location = newActivities.findIndex(
      (activity) => activity.id === editedActivity.activityId
    );
    const activityToUpdate = newActivities[location];
    activityToUpdate.count = editedActivity.count;
    activityToUpdate.duration = editedActivity.duration;
    setActivies(newActivities);
  };

  const onAddActivity = (addedActivity) => {
      const newActivities = [...activities];
      newActivities.push(addedActivity)
      setActivies(newActivities)
  }

  return (
    <div>
      <h2>Update Routine</h2>
      <form>
        Name:
        <input
          required
          value={name}
          onChange={(e) => {
            e.preventDefault();
            setName(e.target.value);
          }}
        ></input>
        Goal:
        <input
          required
          value={goal}
          onChange={(e) => {
            e.preventDefault();
            setGoal(e.target.value);
          }}
        ></input>
        Is Public:
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        <div>
          Activities:{" "}
          {activities.map((activity) => (
            <div key={activity.id}>
              <div>name: {activity.name}</div>
              <div>count: {activity.count}</div>
              <div>duration: {activity.duration}</div>
              <UpdateRoutineActivity
                routineActivity={activity}
                onUpdateActivity={onUpdateActivity}
              />
            </div>
          ))}
        </div>
        <button
          onClick={async (e) => {
            e.preventDefault();
            console.log(name, goal, isPublic);
            const editedRoutine = await editRoutine(
              name,
              goal,
              isPublic,
              props.featuredRoutine.id
            );
            if (editedRoutine.error) {
              alert(editedRoutine.error);
            } else {
              setName("");
              setGoal("");
              setIsPublic(false);
              navigate(-1);
            }
          }}
        >
          Enter
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/routines");
            props.setFeaturedRoutine("");
          }}
        >
          Cancel
        </button>
      </form>
      <AddActivityToRoutineForm featuredRoutine={props.featuredRoutine} onAddActivity={onAddActivity} />
    </div>
  );
};

export default UpdateRoutine;
