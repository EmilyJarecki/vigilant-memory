import React, { useState, useEffect } from "react";
import * as authService from "../Services/authService";
import * as profileService from "../Services/profileService";


// nothing is working here
const ExternalUserFriendshipCheck = ({ id, userInfo }) => {
  const [userFriends, setFriends] = useState(userInfo.friends);
  // friending
  const addAsFriend = async (id) => {
    try {
      const res = await profileService.addFriend(id);
      // Update the friends state to include the new friend
    //   setFriends(res.user.friends);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const unfriend = async (id) => {
    try {
      await profileService.removeFriend(id);
      // Remove the friend from the list if successfully removed
    //   setFriends(userFriends.filter((friend) => friend._id !== id));
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  const isFriend = (id) => {
    console.log(id)
    // return userFriends.some((friend) => friend._id === id);
  };

  return (
    <div>
      <h1>ExternalUserFriendShipCheck</h1>
      <button onClick={() => unfriend(id)}>Remove Friend</button>
      <button onClick={() => addAsFriend(id)}>Add Friend</button>
      {isFriend(id) ? (
        <button onClick={() => unfriend(id)}>Remove Friend</button>
      ) : (
        <button onClick={() => addAsFriend(id)}>Add Friend</button>
      )}
    </div>
  );
};

export default ExternalUserFriendshipCheck;
