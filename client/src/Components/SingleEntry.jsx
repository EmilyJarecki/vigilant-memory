import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "./Entry Forms/UpdateForm.css";

import { CircularProgress } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Reusable component for the shadowed boxes to prevent repitition
const ShadowBox = ({ children, width = 'w-48', textSize = 'text-2xl' }) => (
  <div className={`shadow-md shadow-indigo-300/100 ${width}`}>
    <div className={`${textSize} p-2`}>{children}</div>
  </div>
);

const SingleEntry = (props) => {
  const { _id, category_id, reps, notes, date, weight } =
    props.individualLift || {};

  useEffect(() => {}, [props]);

  if (!props.individualLift) {
    return (
      <div>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <>
    <div className="text-start ms-24" >
      <Link to={`/entry/${props.individualLift.category_id}`}>
        <ArrowBackIcon />
        Back
      </Link>
      </div>
    <div className="flex items-center flex-col">
      <div className="flex flex-col content-center w-96 p-4 gap-4">
        <div className="flex flex-row justify-between">
        <div>
            <p className="text-start">Date: </p>
            <ShadowBox width="w-48">{date}</ShadowBox>
          </div>
          <div>
            <p className="text-start">Weight: </p>
            <ShadowBox width="w-32">{weight}</ShadowBox>
          </div>
        </div>

        <div>
          <p className="text-start">Notes: </p>

          <ShadowBox width="w-full" textSize="text-md">
            {notes ? <p>{notes}</p> : <p>No notes available</p>}
          </ShadowBox>
        </div>
      </div>
    </div></>
  );
};

export default SingleEntry;
