import React, { useState, useEffect } from "react";
import { editRoutine, getUserRoutine } from "../api/api"; // import the API function to edit a routine
import { useNavigate } from "react-router-dom";
import { AddActivityToRoutineForm, UpdateRoutineActivity } from "./exports";

const UpdateRoutine = () => {
  const [routine, setRoutine] = useState({});
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [activities, setActivities] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const routine = JSON.parse(sessionStorage.getItem("FEATURED_ROUTINE"));
    console.log("ID FROM SESSION STORAGE: ", routine);
    getUserRoutine(routine).then((refreshedRoutine) => {
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
    console.log(newActivities);
    const activityToUpdate = newActivities[location];
    activityToUpdate.count = editedActivity.count;
    activityToUpdate.duration = editedActivity.duration;
    setActivities(newActivities);
  };

  const onAddActivity = (addedActivity) => {
    const newActivities = [...activities];
    addedActivity.id = addedActivity.activityId;
    newActivities.push(addedActivity);
    setActivities(newActivities);
  };

  const onRemovedActivity = (removedActivity) => {
    setActivities(
      activities.filter((activity) => activity.id !== removedActivity.id)
    );
  };

  return (
    <div className="tabContainer">
      <h2>Update Routine</h2>
      <form className="formAdd">
       <div> Name: 
        <input
          className="input"
          required
          value={name}
          onChange={(e) => {
            e.preventDefault();
            setName(e.target.value);
          }}
        ></input></div><br/>
        <div>Goal:
        <input
          className="input"
          required
          value={goal}
          onChange={(e) => {
            e.preventDefault();
            setGoal(e.target.value);
          }}
        ></input></div><br/>
        <div> Is Public:
        <input
          className="input"
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        /></div><br/>
        <div>
         <h3>Activities:</h3>
          {activities.map((activity) => (
            <div key={activity.id}>
              <p/>
              <div>Name: {activity.name}</div>
              <div>Count: {activity.count}</div>
              <div>Duration: {activity.duration}</div>
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
