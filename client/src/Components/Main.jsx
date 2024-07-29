import React from 'react'
import { Routes, Route } from "react-router-dom";
import Auth from '../Pages/Auth';
import Fruit from './Fruit';

const Main = (props) => {
  return (
    <main>
        <Routes>
          <Route path="/dashboard" element={<Fruit />} />
          <Route path="/" element={<Auth />}/>

        </Routes> 
    </main>
  )
}

export default Main