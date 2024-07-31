import React from 'react'
import { Routes, Route } from "react-router-dom";
import Auth from '../Pages/Auth';
import Dashboard from '../Pages/Dashboard';
import CreateEntry from './CreateEntry';

const Main = (props) => {
  return (
    <main>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Auth />}/>
          <Route path="/create-entry" element={<CreateEntry />}/>
        </Routes> 
    </main>
  )
}

export default Main