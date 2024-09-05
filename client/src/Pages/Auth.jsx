import React, { useContext, useState } from "react";
import { setUserToken, clearUserToken } from "../utils/authToken";
import { UserContext } from "../data";
import RegisterForm from "../Components/Auth/RegisterForm";
import LoginForm from "../Components/Auth/LoginForm";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getUserToken } from "../utils/authToken";
import { Link } from "react-router-dom";


const Auth = () => {
  const { setAuth, setUser } = useContext(UserContext);
  const token = getUserToken();

  // import the pieces of context we want
  // invoke useContext hook and provide a context object as an argument
  // react will look at the value property of that context
  // provide the named keys in the value prop
  const [person, setPerson] = useState("");

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
        "http://localhost:4000/auth/register",
        configs
      );

      const parsedUser = await newUser.json();
      console.log("parsed user", parsedUser);

      // sets local storage
      setUserToken(parsedUser.token);
      // put the returned user object in state
      setUser({ ...parsedUser.user, name: data.name });
      setAuth(parsedUser.isLoggedIn);
      return parsedUser;
    } catch (err) {
      console.log(err);
      clearUserToken();
      setAuth(false);
    }
  };

  const loginUser = async (data) => {
    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("http://localhost:4000/auth/login", configs);
      const currentUser = await response.json();
      setPerson(currentUser);

      if (currentUser.token) {
        // sets local storage
        setUserToken(currentUser.token);
        setUser({ ...currentUser });
        setAuth(currentUser.isLoggedIn);

        return currentUser;
      } else {
        throw `Server Error: ${currentUser.statusText}`;
      }
    } catch (err) {
      console.log(err);
      clearUserToken();
      setAuth(false);
    }
  };

  return (
    <div>
      {!token ? (
        <div class="flex justify-center bg-gray-200 min-h-screen">
          <div class="flex flex-col w-[50%] pt-20">
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Login</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <LoginForm signIn={loginUser} />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>Create an Account</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <RegisterForm signUp={registerUser} />
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      ) : (
        <div>
        <Link
              to="/dashboard"
              className=""
            >
              Go to Dashboard
            </Link>
        </div>
      )}
    </div>
  );
};

export default Auth;
