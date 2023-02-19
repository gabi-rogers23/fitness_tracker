import React, { useState, useEffect } from "react";
import { editRoutine, getRoutineById } from "../api/api"; // import the API function to edit a routine
import { useNavigate } from "react-router-dom";
import { AddActivityToRoutineForm, UpdateRoutineActivity } from "./exports";

const UpdateRoutine = (props) => {
  const [routine, setRoutine] = useState({});
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [activities, setActivities] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const id =
      props.featuredRoutine.id != null
        ? props.featuredRoutine.id
        : sessionStorage.getItem("FEATURED_ROUTINE");
    console.log(id);

    sessionStorage.setItem("FEATURED_ROUTINE", id);
    getRoutineById(id).then((refreshedRoutine) => {
      console.log(refreshedRoutine);
      setRoutine(refreshedRoutine);
      setName(refreshedRoutine.name);
      setGoal(refreshedRoutine.goal);
      setIsPublic(refreshedRoutine.isPublic);
      setActivities(refreshedRoutine.activities);
    });
  }, []);

  useEffect(() => {}, [activities]);

  const onUpdateActivity = (editedActivity) => {
    const newActivities = [...activities];
    const location = newActivities.findIndex(
      (activity) => activity.id === editedActivity.activityId
    );
    const activityToUpdate = newActivities[location];
    activityToUpdate.count = editedActivity.count;
    activityToUpdate.duration = editedActivity.duration;
    setActivities(newActivities);
  };

  const onAddActivity = (addedActivity) => {
    const newActivities = [...activities];
    newActivities.push(addedActivity);
    setActivities(newActivities);
  };

  const onRemovedActivity = (removedActivity) => {
    setActivities(
      activities.filter((activity) => activity.id !== removedActivity.id)
    );
  };

  return (
    <div>
      <h2>Update Routine</h2>
      <form className="formAdd">
        Name:
        <input
          className="input"
          required
          value={name}
          onChange={(e) => {
            e.preventDefault();
            setName(e.target.value);
          }}
        ></input>
        Goal:
        <input
          className="input"
          required
          value={goal}
          onChange={(e) => {
            e.preventDefault();
            setGoal(e.target.value);
          }}
        ></input>
        Is Public:
        <input
          className="input"
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
                onRemovedActivity={onRemovedActivity}
              />
            </div>
          ))}
        </div>
        <button
          className="buttonAdd"
          onClick={async (e) => {
            e.preventDefault();
            console.log(name, goal, isPublic);
            const editedRoutine = await editRoutine(
              name,
              goal,
              isPublic,
              routine.id
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
          className="buttonAdd"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
            sessionStorage.setItem("FEATURED_ROUTINE", null);
          }}
        >
          Cancel
        </button>
      </form>
      <AddActivityToRoutineForm
        featuredRoutine={routine}
        onAddActivity={onAddActivity}
      />
    </div>
  );
};

export default UpdateRoutine;
