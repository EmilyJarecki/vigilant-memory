import React, { useState, useEffect } from "react";
import IndividualInfo from "../Components/IndividualInfo";
import AllProfiles from "../Components/AllProfiles";
import { getUserFriends } from "../Services/profileService";

const ProfilePage = ({ userInfo, allExceptSelf }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const userFriends = async () => {
      try {
        const userFriend = await getUserFriends();
        console.log(userFriend);
        setFriends(userFriend.friends)
      } catch (error) {
        console.error(error);
      }
    };
    userFriends();
  }, []);

  return (
    <div>
    {friends?.map((elem)=><p key={elem._id}>{elem.firstName}</p>)}
      <IndividualInfo userInfo={userInfo.user} />
      <AllProfiles allExceptSelf={allExceptSelf} userInfo={userInfo.user} />
    </div>
  );
};

export default ProfilePage;
