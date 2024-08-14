import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserToken, clearUserToken } from "../utils/authToken";
import {Button} from "reactstrap";
const Header = () => {
  const token = getUserToken();
  const navigate = useNavigate();

  function logoutUser() {
    clearUserToken();
    navigate("/");
  }

  return (
    <div>
      <nav
      className="navigation"
        class="navbar bg-dark border-bottom border-body ps-4 pe-4"
        data-bs-theme="dark"
      >
        <Link to="/dashboard" className="text-white text-decoration-none">Dashboard</Link>
        {token ? (
          <div>
            <Button outline onClick={logoutUser}>Log Out</Button>
          </div>
        ) : null}
      </nav>
    </div>
  );
};

export default Header;
