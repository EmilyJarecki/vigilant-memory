import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import CategoryEntries from "../Components/CategoryEntries";
import { getCategoryTitleById } from "../Services/categoryService";
import {entriesByCategory } from "../Services/entryService"

import {Fab, CircularProgress} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const AllEntriesFromCategory = () => {
  const [allEntries, setEntries] = useState(null);
  const { id } = useParams();
  const catId = { id };
  const [entryTitle, setEntryTitle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      const entry = await entriesByCategory(id);
      setEntries(entry);
    };
    fetchEntries();
  }, [id]);

  useEffect(() => {
      const loadTitle = async () => {
      try {
        const entryTitle = await getCategoryTitleById(id);
        setEntryTitle(entryTitle);
      } catch (error) {
        console.error(error)
      }
    };
    loadTitle();
  }, [id])
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!entryTitle || !allEntries) {
    return <div><CircularProgress color="secondary" /></div>;
  }

  return (
    <div>
      <h1 class="text-3xl font-black p-4 uppercase font-bold text-[#3f1abb] tracking-[5px]">
        {entryTitle.name}
      </h1>
      <Link to={"/dashboard"} class="me-4">
        <Fab variant="extended" size="medium">
          <ArrowBackIcon sx={{ mr: 1 }} />
          Back
        </Fab>
      </Link>
      <Link to={"/create-entry/" + catId.id} class="ms-4">
        <Fab variant="extended" size="medium" color="primary">
          <AddIcon sx={{ mr: 1 }} />
          Add Entry
        </Fab>
      </Link>
      <CategoryEntries allEntries={allEntries} title={entryTitle.name} />
    </div>
  );
};

export default AllEntriesFromCategory;
