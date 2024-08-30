import React, { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";

import SingleEntry from "../Components/SingleEntry";
import UpdateForm from "../Components/Entry Forms/UpdateForm";

import { getIndividualEntryById, deleteEntry } from "../Services/entryService";
import { getCategoryTitleById } from "../Services/categoryService";

import { Fab } from "@mui/material";
import UpdateTwoToneIcon from "@mui/icons-material/UpdateTwoTone";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const IndividualEntry = () => {
  const [individualLift, setLiftEntry] = useState(null);
  const [userWantsToUpdate, setUserWantsToUpdate] = useState(false);
  const [entryTitle, setEntryTitle] = useState(null);
  
  const { id } = useParams();
  const navigate = useNavigate();

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
        const title = await getCategoryTitleById(individualLift.category_id);
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
      milliseconds,
    } = individualLift;

    propsObj = {
      entry_id,
      category_id,
      reps,
      notes,
      date,
      weight,
      milliseconds,
    };
  }

  return (
    <div>
      <h1 class="text-3xl font-black p-4 uppercase font-bold text-[#3f1abb] tracking-[5px]">
        {entryTitle?.name}
      </h1>
      <div className="flex justify-center gap-[80px]">

        <div className="">
        <SingleEntry individualLift={individualLift} />
          <div class="">
            <div class="">
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
            <div class="">
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
          <div>
            {userWantsToUpdate === true ? (
              <div>
                <UpdateForm {...propsObj} />
                <p onClick={() => setUserWantsToUpdate(false)}>Cancel</p>
              </div>
            ) : null}
          </div>
      </div>
    </div>
  );
};

export default IndividualEntry;
