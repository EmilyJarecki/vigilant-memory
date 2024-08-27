import React from "react";
import IndividualInfo from "../Components/IndividualInfo";
import AllProfiles from "../Components/AllProfiles";

const ProfilePage = ({userInfo, allProfiles}) => {

  return (
    <div>
    <IndividualInfo userInfo={userInfo.user}/>
    <AllProfiles allProfiles={allProfiles}/>
    </div>
  );
};

export default ProfilePage;
