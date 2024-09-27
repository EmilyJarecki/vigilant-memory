import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import { giveEntryLike, removeEntryLike } from "../Services/entryService";

const ExternalUserEntries = ({ entries: initialEntries }) => {
  const [entries, setEntries] = useState(initialEntries);

  // Function to handle liking an entry
  const giveLike = async (id) => {
    try {
      // Call the service to like the entry
      await giveEntryLike(id);

      // Update the entries state to reflect the like
      setEntries(entries.map((ent) =>
        ent._id === id ? { ...ent, likes: [...ent.likes, "newLikeUserId"] } : ent
      ));
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle unliking an entry
  const removeLike = async (id) => {
    try {
      // Call the service to unlike the entry
      await removeEntryLike(id);

      // Update the entries state to reflect the unlike
      setEntries(entries.map((ent) =>
        ent._id === id ? { ...ent, likes: ent.likes.filter(userId => userId !== "newLikeUserId") } : ent
      ));
    } catch (error) {
      console.error(error);
    }
  };

  // Show loading spinner if entries are not yet loaded
  if (!entries) {
    return (
      <div>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <div>
      {entries.map((ent) => (
        <div key={ent._id} className="border-2 w-[100px]">
          <p>Date: {ent.date}</p>
          <p>Weight: {ent.weight}</p>
          <p>Likes: {ent.likes.length}</p>
          <button onClick={() => giveLike(ent._id)}>Like</button>
          <button onClick={() => removeLike(ent._id)}>Unlike</button>
        </div>
      ))}
    </div>
  );
};

export default ExternalUserEntries;