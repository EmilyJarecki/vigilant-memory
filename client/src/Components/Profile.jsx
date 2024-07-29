import React from "react";
import { getUserToken, setUserToken, clearUserToken } from "../utils/authToken";

const Profile = () => {
  const registerUser = async (data) => {
    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const newUser = await fetch(
        "http://localhost:3000/auth/register",
        configs
      );

      const parsedUser = await newUser.json();
      console.log(parsedUser);

      // sets local storage
      setUserToken(parsedUser.token);
      // put the returned user object in state
      // setUser({ ...parsedUser.user, name: data.name });
      // adds a boolean cast of the responses isAuthenticated prop
      // setAuth(parsedUser.isLoggedIn);

      // alternative (safer) implementation would be to use jwt decode library - <https://www.npmjs.com/package/jwt-decode>
      // this would also require reconfiguring our backend so we only send tokens with a signup

      return parsedUser;
    } catch (err) {
      console.log(err);
      clearUserToken();
      // setAuth(false);
    }
  };
  registerUser()
  const loginUser = async (data) => {
    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("http://localhost:3000/auth/login", configs);

      const currentUser = await response.json();
      console.log(currentUser);
    } catch (err) {
      console.log(err);
      clearUserToken();
    }
  };

  // loginUser();

  return <div>Profile</div>;
};

export default Profile;
