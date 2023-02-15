import React, { useState } from "react";
import { createActivity, getAllActivities } from "../api/api";

const NewActivitiesForm = (props) => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  
  return (
    <div>
      <h2>New Activity</h2>
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
        Description:
        <input
          required
          value={description}
          onChange={(e) => {
            e.preventDefault();
            setDescription(e.target.value);
          }}
        ></input>
        <button onClick={async (e)=>{
            e.preventDefault();
            console.log(description)
            const newActivity = await createActivity(name, description)
            if(newActivity.error){
                alert(newActivity.error)
            } else {
            setName("")
            setDescription("")
            const resetActivities = await getAllActivities()
            props.setAllActivities(resetActivities)
            props.setButtonClick(false)
        }
        }}>Enter</button>
        <button onClick={(e)=>{
            e.preventDefault();
            props.setButtonClick(false);
        }}>Cancel</button>
      </form>
    </div>
  );
};

export default NewActivitiesForm;
