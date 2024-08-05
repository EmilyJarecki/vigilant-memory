import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const SingleEntry = (props) => {
  const [entry, setEntry] = useState(null);
  const { id } = useParams();
  const URL = `http://localhost:4000/${id}`;

  useEffect(() => {
    const getSingleEntry = async () => {
      try {
        const response = await fetch(URL);
        const singleEntry = await response.json();
        setEntry(singleEntry);
      } catch (error) {
        console.error(error);
      }
    };
    getSingleEntry();
    
  }, []);

  return <div>{entry ? <p>{entry.fruit}</p> : null}</div>;
};

export default SingleEntry;
