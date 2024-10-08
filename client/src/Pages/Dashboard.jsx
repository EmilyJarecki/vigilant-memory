import React from "react";
import Categories from "../Components/Dashboard/Categories";

const Dashboard = ({categoryList}) => {
  return (
    <>
      <h1 className="text-4xl p-6 font-bold uppercase text-indigo-500/100 tracking-[10px]">Lifts</h1>
      <Categories categoryList={categoryList}/>
    </>
  );
};

export default Dashboard;
