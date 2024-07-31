import React from 'react'
// import CreateEntry from '../components/CreateEntry'
import Fruit from '../Components/Fruit'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <>
    <Link to="/create-entry">Create Entry</Link>
    <Fruit />
    </>
  )
}

export default Dashboard