import React from 'react'
// import CreateEntry from '../components/CreateEntry'
import Lifts from '../Components/Categories'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <>
    <Link to="/create-entry">Create Entry</Link>
    <Lifts />
    </>
  )
}

export default Dashboard