import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getUserToken } from "../utils/authToken";
import CatEntries from '../Components/CatEntries'



const AllEntriesFromCategory = () => {
    const token = getUserToken();
    const [allEntries, setEntry] = useState(null);
    const [title, setTitle] = useState(null)
    const { id } = useParams();
    const URL = `http://localhost:4000/entry/${id}`;
  const TITLE_URL = `http://localhost:4000/category/${id}`
  
  
    useEffect(() => {
      // get all entries from this category
      const entries = async () => {
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
          console.log(response)
          const allEntries = await response.json();
          console.log("All ENtries:", allEntries)
          setEntry(allEntries);
        } catch (error) {
          console.error(error);
        }
      };
      entries();
      

      const categoryTitle = async () => {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          redirect: "follow",
        };
  
        try {
          const response = await fetch(TITLE_URL, requestOptions);
          console.log(response)
          const title = await response.json();
          console.log("Title:", title.name)
          setTitle(title.name)
        } catch (error) {
          console.error(error);
        }
      };
      categoryTitle();
    }, [URL, TITLE_URL]);

  return (
    <div>
        <CatEntries allEntries={allEntries} title={title}/>
    </div>
  )
}

export default AllEntriesFromCategory