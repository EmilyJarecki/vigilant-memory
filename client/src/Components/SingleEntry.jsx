import React, { useEffect, useState } from "react";
import { getUserToken } from "../utils/authToken";
import { Link } from "react-router-dom";
import UpdateForm from "./Entry Forms/UpdateForm";
import { useNavigate } from "react-router-dom";
import "./Entry Forms/UpdateForm.css";
import { Fab } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UpdateTwoToneIcon from "@mui/icons-material/UpdateTwoTone";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const SingleEntry = (props) => {
  const { _id, category_id, reps, notes, date, weight, milliseconds } =
    props.individualLift || {};

  const ENTRY_URL = `http://localhost:4000/entry/${_id}`;
  const TITLE_URL = `http://localhost:4000/category/${category_id}`;
  const [title, setTitle] = useState(null);
  const token = getUserToken();
  const [userWantsToUpdate, setUserWantsToUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const categoryTitle = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      };

      try {
        const response = await fetch(TITLE_URL, requestOptions);
        const title = await response.json();
        setTitle(title.name);
      } catch (error) {
        console.error(error);
      }
    };
    categoryTitle();
  }, [TITLE_URL, props.title]);

  if (!props.individualLift || !title) {
    return <div>Loading...</div>; // Or some loading indicator
  }

  const deleteEntry = async () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      redirect: "follow",
    };

    try {
      const response = await fetch(ENTRY_URL, requestOptions);
      const result = await response.json();
      console.log(result);
      navigate(`/entry/${category_id}`);
      // navigate(`/entry/${category_id}`)
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
  console.log("propsObj: ", propsObj)

  return (
    <div>
      <h1 class="text-3xl font-black p-4 uppercase font-bold text-[#3f1abb] tracking-[5px]">
        {title}
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
                onClick={() => deleteEntry()}
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
            Update<span> {title}</span>
          </h1>
          <UpdateForm {...propsObj} />
        </div>
      )}
    </div>
  );
};

export default SingleEntry;
