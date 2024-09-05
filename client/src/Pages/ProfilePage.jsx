import React, { useState, useEffect } from "react";
import IndividualInfo from "../Components/Profile/IndividualInfo";
import AllProfiles from "../Components/Profile/AllProfiles";
import { getUserFriends } from "../Services/profileService";
import UserFriends from "../Components/Profile/UserFriends";

const ProfilePage = ({ userInfo, allExceptSelf }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const userFriends = async () => {
      try {
        const userFriend = await getUserFriends();
        console.log(userFriend);
        setFriends(userFriend.friends);
      } catch (error) {
        console.error(error);
      }
    };
    userFriends();
  }, []);

  return (
    <div>
      <UserFriends userFriends={friends} />
      <IndividualInfo userInfo={userInfo.user} />
      <AllProfiles allExceptSelf={allExceptSelf} userInfo={userInfo.user} />
    </div>
  );
};

export default ProfilePage;
