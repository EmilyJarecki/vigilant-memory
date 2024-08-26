import React, { useEffect, useState } from "react";

const IndividualInfo = ({ userInfo }) => {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        if (userInfo) {
          setProfile(userInfo);
        }
      }, [userInfo]);

  return (
    <div>
    <h1>IndividualInfo</h1>
      <p>NAME: {profile.name}</p>
      <p>USERNAME: {profile.username}</p>
    </div>
  );
};

export default IndividualInfo;
