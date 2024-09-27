import React, { useEffect, useState } from "react";
import CreateEntryForm from "../Components/Entry Forms/CreateEntryForm";
import { Link, useParams } from "react-router-dom";
import { Fab, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getCategoryTitleById } from "../Services/categoryService";

const CreateEntry = () => {
  const { id } = useParams();
  const [title, setTitle] = useState(null);

  useEffect(() => {
    const loadTitle = async () => {
      try {
        const entryTitle = await getCategoryTitleById(id);
        setTitle(entryTitle);
      } catch (error) {
        console.error(error);
      }
    };
    loadTitle();
  }, [id]);

  if (!title) {
    return <div><CircularProgress color="secondary" /></div>;
  }

  return (
    <div className="mt-8">
      <Link to={`/entry/${id}`}>
        <Fab variant="extended" size="medium">
          <ArrowBackIcon sx={{ mr: 1 }} />
          Back
        </Fab>
      </Link>
      <h1 className="text-xl font-bold mb-4 update-title-min">Create Entry for </h1>
      <p className="update-title">{title.name}</p>
      <CreateEntryForm categoryId={`${id}`} />
    </div>
  );
};

export default CreateEntry;
