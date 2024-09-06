import React, { useState, useEffect } from "react";
import { removeFriend } from "../../Services/profileService";

const UserFriends = ({ userFriends }) => {
  console.log(userFriends)
  const [friends, setFriends] = useState(userFriends);

  useEffect(() => {}, [userFriends]);

  const unfriend = async (id) => {
    try {
      const response = await removeFriend(id);
      if (response?.success) {
        // Remove the friend from the list if successfully removed
        setFriends((prevFriends) =>
          prevFriends.filter((friend) => friend._id !== id)
        );
      }
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  return (
    <div>
      <h1>Friends</h1>
      <div>
        {userFriends?.length > 0 ? (
          userFriends.map((friend) => (
            <div key={friend._id}>
              <p>{friend.firstName}</p>
              {/* <button onClick={() => unfriend(friend._id)}>Unfriend</button> */}
            </div>
          ))
        ) : (
          <p>No friends to display.</p>
        )}
      </div>
    </div>
  );
};

export default UserFriends;
