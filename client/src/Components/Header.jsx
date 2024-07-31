import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserToken, clearUserToken } from "../utils/authToken";

const Header = () => {
  const token = getUserToken();
  const navigate = useNavigate();

  function logoutUser() {
    clearUserToken();
    navigate("/")
  }

  return (
    <div class="main-header">
      <Link to="/dashboard">Dashboard</Link>
      {token ? (
        <div>
          <button onClick={logoutUser}>Log Out</button>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
