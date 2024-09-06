import React, { useEffect, useState } from "react";
import {CircularProgress, Paper} from "@mui/material";

const IndividualInfo = ({ userInfo }) => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (userInfo) {
      setProfile(userInfo);
    }
  }, [userInfo]);

  if (!profile.user) {
    return (
      <div>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
      <div className="flex justify-center m-8">
        <Paper className="w-1/2 p-8" variant="elevation">
          <p>name: {profile.user.firstName}</p>
          <p>username: {profile.user.username}</p>
        </Paper>
      </div>
  );
};

export default IndividualInfo;
