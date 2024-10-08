import React, { useState, useEffect } from "react";
import * as authService from "../Services/authService";
import * as profileService from "../Services/profileService";
import {  Paper } from "@mui/material";

// nothing is working here
const ExternalUserFriendshipCheck = ({ id, userInfo }) => {
  const [userFriends, setFriends] = useState(userInfo.friends || []);

  
  useEffect(() => {
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
      setFriends([...userFriends, res]);
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

      return await profileService.removeFriend(id);
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
