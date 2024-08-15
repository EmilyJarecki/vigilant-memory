import React from "react";
import { getUserToken, setUserToken, clearUserToken } from "../utils/authToken";
import { useContext, useState } from "react";
import { UserContext } from "../data";
import { useNavigate, Link } from "react-router-dom";
import RegisterForm from "../Components/Auth/RegisterForm";
import LoginForm from "../Components/Auth/LoginForm";
import { Button } from "reactstrap";

const Auth = (props) => {
  const { setAuth, setUser } = useContext(UserContext);

  // import the pieces of context we want
  // invoke useContext hook and provide a context object as an argument
  // react will look at the value property of that context
  // provide the named keys in the value prop
  const [person, setPerson] = useState("");
  // console.log(setAuth, setUser)
  const navigate = useNavigate();
  const token = getUserToken();

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
      // adds a boolean cast of the responses isAuthenticated prop
      setAuth(parsedUser.isLoggedIn);

      // alternative (safer) implementation would be to use jwt decode library - <https://www.npmjs.com/package/jwt-decode>
      // this would also require reconfiguring our backend so we only send tokens with a signup
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

        console.log(currentUser);
        console.log(configs);
        console.log(currentUser._id);
        // put the returned user object in state
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

  function logoutUser() {
    clearUserToken();
    navigate("/");
  }

  return (
    <div>
      {!token ? (
        <>
          <div>
            <h3>Not a member? Register here:</h3>
            <RegisterForm signUp={registerUser} />
          </div>

          <h3>Or login here!</h3>
          <div>
            <LoginForm signIn={loginUser} />
          </div>
        </>
      ) : null}

      <div>
        {token ? (
          <>
            <div>
              <Link to="/dashboard">
                <Button color="primary" className="mt-4 mb-4">
                  Dashboard
                </Button>
              </Link>
            </div>
            <Button onClick={logoutUser}>Log Out</Button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Auth;
