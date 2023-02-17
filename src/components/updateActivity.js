import React, { useState } from "react";
import { editActivity } from "../api/api";
import { useNavigate } from "react-router-dom";

const UpdateActivity = (props) => {
  console.log(props.featuredActivity);
  const [name, setName] = useState(props.featuredActivity.name);
  const [description, setDescription] = useState(props.featuredActivity.description);
  const navigate = useNavigate();
  return (
    <div>
      <h2>Update Activity</h2>
      <form>
        <div>Name: {name}</div>
        Description:
        <input
          required
          value={description}
          onChange={(e) => {
            e.preventDefault();
            setDescription(e.target.value);
          }}
        ></input>
        <button
          onClick={async (e) => {
            e.preventDefault();
            console.log(name, description);
            const editedActivity = await editActivity(name, description, props.featuredActivity.id)

              if(editedActivity.error){
                  alert(editedActivity.error)
              } else {
              setName("")
              setDescription("")
              navigate(-1)
              }
          }}
        >
          Enter
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/activities");
            props.setFeaturedActivity("")
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateActivity;
