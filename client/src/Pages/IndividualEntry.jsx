import SingleEntry from '../Components/SingleEntry'
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getUserToken } from "../utils/authToken";

const IndividualEntry = () => {
    const { id } = useParams();
    const [individualLift, setLiftEntry] = useState(null);
    const URL = `http://localhost:4000/entry/individual/${id}`;
    const token = getUserToken();
  
    useEffect(() => {
      const lift = async () => {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          redirect: "follow",
        };
  
        try {
          const response = await fetch(URL, requestOptions);
          const lift = await response.json();
          console.log(lift);
          setLiftEntry(lift);
        } catch (error) {
          console.error(error);
        }
      };
      lift();
    }, [URL]);
  return (


    <div>
        <SingleEntry individualLift={individualLift}/>
    </div>
  )
}

export default IndividualEntry