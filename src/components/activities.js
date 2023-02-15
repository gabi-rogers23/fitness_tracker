import React, { useState, useEffect } from "react";
import { getAllActivities } from "../api/api";
import { NewActivitiesForm } from "./exports";
import { useNavigate } from "react-router-dom";

const Activities = (props) => {
  const [allActivities, setAllActivities] = useState([]);
  const [buttonClick, setButtonClick] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([getAllActivities()]).then(([allActivitiesResults]) => {
      try {
        // console.log(allActivitiesResults);
        setAllActivities(allActivitiesResults);
      } catch (error) {
        console.log(error);
        console.error("Uh oh! Problems with Promises");
      }
    });
  }, []);

  return (
    <div>
      {props.isLoggedIn && (
        <button
          onClick={(e) => {
            e.preventDefault();
            setButtonClick(true);
          }}
        >
          Add Activity
        </button>
      )}

      {buttonClick && (
        <NewActivitiesForm
          setAllActivities={setAllActivities}
          setButtonClick={setButtonClick}
        />
      )}

      <div>
        {allActivities.map((activity) => {
          return (
            <div key={activity.id}>
              NAME: {activity.name}
              <br />
              DESCIPTION: {activity.description}
              <br />
              {props.isLoggedIn && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(activity);
                    props.setFeaturedActivity(activity);
                    navigate("/updateactivity");
                  }}
                >
                  Edit
                </button>
              )}
              <p />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Activities;
