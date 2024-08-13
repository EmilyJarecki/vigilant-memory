import React from 'react'
import { Routes, Route } from "react-router-dom";
import Auth from '../Pages/Auth';
import Dashboard from '../Pages/Dashboard';
import AllEntriesFromCategory from '../Pages/AllEntriesFromCategory';
import IndividualEntry from '../Pages/IndividualEntry';
import CreateEntry from '../Pages/CreateEntry';

const Main = () => {

  return (
    <main>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Auth />}/>
          <Route path="/entry/:id" element={<AllEntriesFromCategory />}/>
          <Route path="/create-entry/:id" element={<CreateEntry />}/>
          <Route path="/single-entry/:id" element={<IndividualEntry />}/>
        </Routes> 
    </main>
  )
}

export default Main