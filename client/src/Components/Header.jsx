import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserToken, clearUserToken } from "../utils/authToken";
import {Button} from "reactstrap";

// get user profile here

const Header = () => {
  const token = getUserToken();
  const navigate = useNavigate();

  function logoutUser() {
    clearUserToken();
    navigate("/");
  }

  return (
    <div>
        {token ? (
      <nav
      className="navigation"
        class="navbar bg-dark border-bottom border-body ps-4 pe-4"
        data-bs-theme="dark"
      >
      <div className="">
        <Link to="/dashboard" className="text-white text-decoration-none pe-4">Dashboard</Link>
        <Link to="/profile" className="text-white text-decoration-none">Profile</Link>

      </div>
          <div>
            <Button outline onClick={logoutUser}>Log Out</Button>
          </div>
      </nav>
        ) : (
          <nav
      className="navigation"
        class="navbar bg-dark border-bottom border-body p-4"
        data-bs-theme="dark"
      >
        <h1 className="text-white text-decoration-none">SugarLift</h1>
      </nav>
        )}
    </div>
  );
};

export default Header;
