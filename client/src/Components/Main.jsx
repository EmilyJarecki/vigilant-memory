import React from 'react'
import { Routes, Route } from "react-router-dom";
import Auth from '../Pages/Auth';
import Dashboard from '../Pages/Dashboard';
import CreateEntry from './CreateEntry';
import AllEntriesFromCategory from '../Pages/AllEntriesFromCategory';
import IndividualEntry from '../Pages/IndividualEntry';

const Main = () => {

  return (
    <main>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Auth />}/>
          <Route path="/create-entry" element={<CreateEntry />}/>
          <Route path="/entry/:id" element={<AllEntriesFromCategory />}/>
          <Route path="/single-entry/:id" element={<IndividualEntry />}/>
        </Routes> 
    </main>
  )
}

export default Main