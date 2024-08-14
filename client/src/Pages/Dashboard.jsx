import React from "react";
import { Link } from "react-router-dom";
import Categories from "../Components/Categories";
import Button from "@mui/material/Button";

const Dashboard = () => {
  return (
    <>
      <Button variant="contained">Hello world</Button>

      <h1 class="text-4xl p-6 font-black">Lifts</h1>
      <Categories />
    </>
  );
};

export default Dashboard;
