import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UpdateForm from "./Entry Forms/UpdateForm";
import { useNavigate } from "react-router-dom";
import "./Entry Forms/UpdateForm.css";
import { Fab } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UpdateTwoToneIcon from "@mui/icons-material/UpdateTwoTone";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { deleteEntry } from "../Services/entryService";
import { getCategoryTitleById } from "../Services/categoryService";

const SingleEntry = (props) => {
  const { _id, category_id, reps, notes, date, weight, milliseconds } =
    props.individualLift || {};
  const [entryTitle, setEntryTitle] = useState(null);

  const [userWantsToUpdate, setUserWantsToUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTitle = async () => {
    try {
      const title = await getCategoryTitleById(category_id);
      setEntryTitle(title);
    } catch (error) {
      console.error(error)
    }
  };
  loadTitle();
}, [category_id])

  if (!props.individualLift || !entryTitle) {
    return <div>Loading...</div>; // Or some loading indicator
  }

  const deleteLiftEntry = async () => {
    try {
      const response = await deleteEntry(_id)
      navigate(`/entry/${category_id}`);
      return response
    } catch (error) {
      console.error(error);
    }
  };

  // category_id, notes, date, weight
  const propsObj = {
    entry_id: _id,
    category_id: category_id,
    reps: reps,
    notes: notes,
    date: date,
    weight: weight,
    milliseconds: milliseconds
  };


  return (
    <div>
      <h1 class="text-3xl font-black p-4 uppercase font-bold text-[#3f1abb] tracking-[5px]">
        {entryTitle.name}
      </h1>
      <div class="mb-4">
        <Link to={`/entry/${props.individualLift.category_id}`}>
          <Fab variant="extended" size="medium">
            <ArrowBackIcon sx={{ mr: 1 }} />
            Back
          </Fab>
        </Link>
      </div>
      {userWantsToUpdate === false ? (
        <div>
          <div class="flex justify-center">
            <div class=" w-[500px]shadow-lg shadow-indigo-500/50">{weight}</div>
          </div>

          <div class="flex flex-row justify-center mt-4">
            <div class="me-4">
              <Fab
                color="error"
                variant="extended"
                size="medium"
                onClick={() => deleteLiftEntry()}
              >
                <RemoveCircleIcon sx={{ mr: 1 }} />
                Delete
              </Fab>
            </div>
            <div class="ms-4">
              <Fab
                color="primary"
                variant="extended"
                size="medium"
                onClick={() => setUserWantsToUpdate(true)}
              >
                <UpdateTwoToneIcon sx={{ mr: 1 }} />
                Update
              </Fab>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 class="text-indigo-500/50 update-title">
            Update<span> {entryTitle.name}</span>
          </h1>
          <UpdateForm {...propsObj} />
        </div>
      )}
    </div>
  );
};

export default SingleEntry;
