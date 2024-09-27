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
      <div className="m-8">
      
        <Paper className="w-[336px] p-8" variant="elevation">
        <div class="text-start">
          <h1 class="font-bold">My Profile </h1>
          <p class="pb-4 pt-4 flex justify-between border-b-2">Name: <span>{userInfo.firstName} {userInfo.lastName}</span></p>
          <p  class="pb-4 pt-4 flex justify-between border-b-2">Username: <span>{userInfo.username}</span></p>
        </div>
        </Paper>
      </div>
  );
};

export default IndividualInfo;
