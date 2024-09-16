import React, { useEffect, useState } from "react";
import {CircularProgress, Paper} from "@mui/material";

const IndividualInfo = ({ userInfo }) => {
  // console.log(userInfo)


  if (!userInfo) {
    return (
      <div>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
      <div className="flex justify-center m-8">
      
        <Paper className="w-1/2 p-8" variant="elevation">
          <p>name: {userInfo.firstName}</p>
          <p>username: {userInfo.username}</p>
        </Paper>
      </div>
  );
};

export default IndividualInfo;
