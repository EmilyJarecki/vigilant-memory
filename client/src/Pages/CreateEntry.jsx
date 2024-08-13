import React from "react";
import CreateEntryForm from "../Components/CreateEntryForm";
import { useParams } from "react-router-dom";

const CreateEntry = () => {
  const { id } = useParams();

  return (
    <div>
      <CreateEntryForm categoryId={`${id}`} />
    </div>
  );
};

export default CreateEntry;
