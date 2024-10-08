import React, { useState, useEffect } from "react";
import * as authService from "../Services/authService";
import * as profileService from "../Services/profileService";
import {  Paper } from "@mui/material";

// nothing is working here
const ExternalUserFriendshipCheck = ({ id, userInfo }) => {
  const [userFriends, setFriends] = useState(userInfo.friends || []);
  // friending
  
  useEffect(() => {
    // Assuming userInfo might change, we update the userFriends state
    setFriends(userInfo.friends || []);
  }, [userInfo]);
  
  console.log("USERINFO:", userInfo)
  console.log("USERFRIENDS:", userFriends)


  const addAsFriend = async (id) => {
    try {
      // Optimistically update the state before the request
      setFriends((prevFriends) => [...prevFriends, id]);

      const res = await profileService.addFriend(id);
      // Optionally, if you need to sync with server response
      // setFriends(res.user.friends);
    } catch (error) {
      console.error("Error adding friend:", error);
      // Optionally revert state if the request fails
      setFriends((prevFriends) => prevFriends.filter((friend) => friend !== id));
    }
  };


  const unfriend = async (id) => {
    try {
      // Optimistically update the state before the request
      setFriends((prevFriends) => prevFriends.filter((friend) => friend !== id));

      await profileService.removeFriend(id);
      // Optionally, if you need to sync with server response
      // setFriends(res.user.friends);
    } catch (error) {
      console.error("Error removing friend:", error);
      // Optionally revert state if the request fails
      setFriends((prevFriends) => [...prevFriends, id]);
    }
  };


  return (
    <div>
      <h1>ExternalUserFriendShipCheck</h1>
      <div className="m-8">
      
      <Paper className="w-[336px] p-8" variant="elevation">
      <div class="text-start">
        <h1 class="font-bold">My Profile </h1>
        <p class="pb-4 pt-4 flex justify-between border-b-2">Name:</p>
        <p  class="pb-4 pt-4 flex justify-between border-b-2">Username: </p>
      </div>
      </Paper>
    </div>



      <button onClick={() => unfriend(id)}>Remove Friend</button>
      <button onClick={() => addAsFriend(id)}>Add Friend</button>
      <br></br>
      BREAK
      <div>
      {Array.isArray(userFriends) && userFriends.includes(id) ? (        
        <button onClick={() => unfriend(id)}>Remove Friend</button>
      ) : (
        <button onClick={() => addAsFriend(id)}>Add Friend</button>
      )}
</div>

    </div>
  );

  
};

export default ExternalUserFriendshipCheck;
