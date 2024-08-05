import React from 'react'
import { Routes, Route } from "react-router-dom";
import Auth from '../Pages/Auth';
import Dashboard from '../Pages/Dashboard';
import CreateEntry from './CreateEntry';
import SingleEntry from './SingleEntry';

const Main = (props) => {
  return (
    <main>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Auth />}/>
          <Route path="/create-entry" element={<CreateEntry />}/>
          <Route path="/entry/:id" element={<SingleEntry />}/>
        </Routes> 
    </main>
  )
}

export default Main