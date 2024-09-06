import React, { useState, useEffect } from "react";
import * as authService from "../Services/authService";
import * as profileService from "../Services/profileService";
import { CircularProgress } from "@mui/material";
import UserFriends from "../Components/Profile/UserFriends";

const ProfilePage = (props) => {
  const [userFriendArr, setFriends] = useState([]);
  const [user, setUser] = useState(authService.getUser());

  useEffect(() => {
    const fetchUserFriends = async () => {
      try {
        const userFriend = await profileService.getUserFriends();
        setFriends(userFriend.friends);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserFriends();
  }, [user]);

  // friending
  const addAsFriend = async (id) => {
    try {
      const res = await profileService.addFriend(id);
      // Update the friends state to include the new friend
      setFriends(res.user.friends);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const unfriend = async (id) => {
    try {
      await profileService.removeFriend(id);
      // Remove the friend from the list if successfully removed
      setFriends(userFriendArr.filter((friend) => friend._id !== id));
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  if (!props) {
    return (
      <div>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  const isFriend = (id) => {
    return userFriendArr.some(friend => friend._id === id);
  };

  return (
    <div>
      <h1>Hello from Profile Page</h1>
      <div>
        {props.allExceptSelf.map((elem) => (
          <div key={elem._id} className="border-4 p-2 mb-2">
            <h2>Hello {elem.firstName}</h2>
            {isFriend(elem._id) ? (
              <button onClick={() => unfriend(elem._id)}>Remove Friend</button>
            ) : (
              <button onClick={() => addAsFriend(elem._id)}>Add Friend</button>
            )}
          </div>
        ))}
      </div>
      <div>
        FRIENDS!
        {userFriendArr.map((elem) => (
          <div key={elem._id} className="border-2">
            <p>{elem.firstName}</p>
            <button onClick={() => unfriend(elem._id)}>Remove Friend</button>
          </div>
        ))}
      </div>

      {/* Add your components here */}
      {/* <UserFriends userFriends={userFriendArr} /> */}
      {/* <IndividualInfo userInfo={userProfile} />
      <AllProfiles allExceptSelf={allExceptSelf} userInfo={user} /> */}
    </div>
  );
};

export default ProfilePage;
