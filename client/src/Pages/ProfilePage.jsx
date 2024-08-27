import React from "react";
import IndividualInfo from "../Components/IndividualInfo";
import AllProfiles from "../Components/AllProfiles";

const ProfilePage = ({userInfo, allExceptSelf}) => {

  return (
    <div>
    <IndividualInfo userInfo={userInfo.user}/>
    <AllProfiles allExceptSelf={allExceptSelf}/>
    </div>
  );
};

export default ProfilePage;
