import React, { useState } from "react";
import { CircularProgress, Paper } from "@mui/material";
import { giveEntryLike, removeEntryLike } from "../Services/entryService";
import SpareTable from "./SpareTable";
import * as authService from "../Services/authService";

const ExternalUserEntries = ({ entries: initialEntries, categoryChoice, repChoice }) => {
  const externalUser = true
  const [entries, setEntries] = useState(initialEntries);
console.log("Entries: ", entries)
  
  const [user, setUser] = useState(authService.getUser());
console.log("USER: ", user)

  // Function to handle liking an entry
  const giveLike = async (id) => {
    try {
      // Get the current entry based on the id
      const entry = entries.find((ent) => ent._id === id);
  
      // Check if the user has already liked the entry
      const userId = "newLikeUserId"; // Replace this with the actual user ID
      if (entry.likes.includes(userId)) {
        console.log("User has already liked this entry");
        return; // Exit the function if the user has already liked it
      }
  
      // Call the service to like the entry
      await giveEntryLike(id);
  
      // Update the entries state to reflect the new like
      setEntries(entries.map((ent) =>
        ent._id === id ? { ...ent, likes: [...ent.likes, userId] } : ent
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
      <h1>No Entries</h1>
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
      <SpareTable entries={entries} chosenRep={repChoice}/>
    </div>
  );
};

export default ExternalUserEntries;