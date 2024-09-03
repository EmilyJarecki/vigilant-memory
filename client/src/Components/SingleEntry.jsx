import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "./Entry Forms/UpdateForm.css";

import { Fab, CircularProgress } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SingleEntry = (props) => {
  const { _id, category_id, reps, notes, date, weight } =
    props.individualLift || {};

  useEffect(() => {
  }, [props]);

  if (!props.individualLift) {
    return (
      <div>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <div>
      <div class="mb-4">
        <Link to={`/entry/${props.individualLift.category_id}`}>
          <Fab variant="extended" size="medium">
            <ArrowBackIcon sx={{ mr: 1 }} />
            Back
          </Fab>
        </Link>
      </div>
      <div>{date}</div>
      <div>{weight}</div>
      <div>{notes}</div>
    </div>
  );
};

export default SingleEntry;
