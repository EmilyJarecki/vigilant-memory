import React, { useState, useEffect } from "react";
import IndividualInfo from "../Components/Profile/IndividualInfo";
import AllProfiles from "../Components/Profile/AllProfiles";
import UserFriends from "../Components/Profile/UserFriends";
import * as authService from "../Services/authService";
import * as profileService from "../Services/profileService";

const ProfilePage = () => {
  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState(authService.getUser());
  const [allExceptSelf, setAllExceptSelf] = useState([]);
  const [userProfile, setUserProfile] = useState(profileService.show());

  useEffect(() => {
    const userFriends = async () => {
      try {
        const userFriend = await profileService.getUserFriends();
        console.log(userFriend);
        setFriends(userFriend.friends);
      } catch (error) {
        console.error(error);
      }
    };
    userFriends();
  }, [user]);
  
  useEffect(() => {
    const exceptSelf = async () => {
    try {
      const others = await profileService.allProfilesExceptSelf(user);
      setAllExceptSelf(others);
    } catch (error) {
      console.error(error)
    }
  };
  exceptSelf();
}, [user])

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const profileData = await profileService.show(user);
        setUserProfile(profileData);
      }
    };
    fetchProfile();
  }, [user]);

  return (
    <div>
      <UserFriends userFriends={friends} />
      <IndividualInfo userInfo={userProfile} />
      <AllProfiles allExceptSelf={allExceptSelf} userInfo={user} />
    </div>
  );
};

export default ProfilePage;
