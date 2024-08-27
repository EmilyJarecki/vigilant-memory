import SingleEntry from "../Components/SingleEntry";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getIndividualEntryById } from "../Services/entryService";

const IndividualEntry = () => {
  const { id } = useParams();
  const [individualLift, setLiftEntry] = useState(null);


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
  
  return (
    <div>
      <SingleEntry individualLift={individualLift} />
    </div>
  );
};

export default IndividualEntry;
