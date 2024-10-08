import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { getCategoryTitleById } from "../Services/categoryService";

import {  CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LiftByReps from "../Components/CategoryEntries/LiftByReps";

const AllEntriesFromCategory = () => {
  const [entryTitle, setEntryTitle] = useState(null);
  const { id } = useParams();
  const catId = { id };

  useEffect(() => {
    const loadTitle = async () => {
      try {
        const entryTitle = await getCategoryTitleById(id);
        setEntryTitle(entryTitle);
      } catch (error) {
        console.error(error);
      }
    };
    loadTitle();
  }, [id]);

  if (!entryTitle) {
    return (
      <div>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-black p-4 uppercase font-bold text-[#3f1abb] tracking-[5px]">
        {entryTitle.name}
      </h1>

      <div className="flex justify-center flex-wrap">
        <Link to={"/dashboard"} className="me-4">
          <ArrowBackIcon />
          Back
        </Link>
      </div>

      <LiftByReps categoryId={catId.id} />
    </div>
  );
};

export default AllEntriesFromCategory;
