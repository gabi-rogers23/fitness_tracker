import React, { useState } from "react";
import { editRoutine } from "../api/api"; // import the API function to edit a routine
import { useNavigate } from "react-router-dom";
import  { AddActivityToRoutineForm } from "./exports"

const UpdateRoutine = (props) => {
  console.log(props.featuredRoutine);
  const [name, setName] = useState(props.featuredRoutine.name);
  const [goal, setGoal] = useState(props.featuredRoutine.goal);
  const [isPublic, setIsPublic] = useState(props.featuredRoutine.isPublic);
  const navigate = useNavigate();

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
      <AddActivityToRoutineForm featuredRoutine={props.featuredRoutine}/>
    </div>
  );
};

export default UpdateRoutine;
