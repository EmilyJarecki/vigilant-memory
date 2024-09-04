import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import SingleEntry from "../Components/SingleEntry";
import UpdateForm from "../Components/Entry Forms/UpdateForm";

import { getIndividualEntryById, deleteEntry } from "../Services/entryService";
import { getCategoryTitleById } from "../Services/categoryService";

import { Box, Fade, Button } from "@mui/material";

const IndividualEntry = () => {
  const [individualLift, setLiftEntry] = useState(null);
  const [userWantsToUpdate, setUserWantsToUpdate] = useState(false);
  const [entryTitle, setEntryTitle] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = () => {
    setUserWantsToUpdate((prev) => !prev);
  };

  useEffect(() => {
    const lift = async () => {
      try {
        const individualEntry = await getIndividualEntryById(id);
        setLiftEntry(individualEntry);
      } catch (error) {
        console.error(error);
      }
    };
    lift();
  }, [id]);

  useEffect(() => {
    const loadTitle = async () => {
      try {
        const title = await getCategoryTitleById(individualLift?.category_id);
        setEntryTitle(title);
      } catch (error) {
        console.error(error);
      }
    };
    loadTitle();
  }, [individualLift]);

  const deleteLiftEntry = async () => {
    try {
      const response = await deleteEntry(id);
      navigate(`/entry/${individualLift.category_id}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  let propsObj;

  if (individualLift) {
    const {
      _id: entry_id,
      category_id,
      reps,
      notes,
      date,
      weight,
    } = individualLift;

    propsObj = {
      entry_id,
      category_id,
      reps,
      notes,
      date,
      weight,
    };
  }

  const form = (
    <div>{propsObj != undefined ? <UpdateForm {...propsObj} /> : null}</div>
  );
  return (
    <div>
      <h1 class="text-3xl font-black p-4 uppercase font-bold text-[#3f1abb] tracking-[5px]">
        {entryTitle?.name}
      </h1>
        <SingleEntry individualLift={individualLift} />
      <div className="flex justify-center gap-[80px]">
        <div>
          <Button variant="contained" onClick={() => deleteLiftEntry()}>
            Delete
          </Button>
        </div>
        <div>
          <Button variant="contained" onClick={handleChange}>
            {userWantsToUpdate ? "Cancel" : "Update"}
          </Button>
        </div>
      </div>
      <div className="flex justify-center">
          <Box sx={{ display: "flex" }}>
            <Fade in={userWantsToUpdate}>{form}</Fade>
          </Box>
          </div>
    </div>
  );
};

export default IndividualEntry;
