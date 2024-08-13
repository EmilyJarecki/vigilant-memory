import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getUserToken } from "../utils/authToken";
import CatEntries from "../Components/CatEntries";
import CreateEntryForm from "../Components/CreateEntryForm";
import { Link } from "react-router-dom";


const AllEntriesFromCategory = () => {
  const token = getUserToken();
  const [allEntries, setEntry] = useState(null);
  const [title, setTitle] = useState(null);
  const [userWantsNewEntry, setUserWantsNewEntry] = useState(false);
  const { id } = useParams();
  const URL = `http://localhost:4000/entry/${id}`;
  const TITLE_URL = `http://localhost:4000/category/${id}`;
  const catId = {id}
console.log(catId.id)

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
        const allEntries = await response.json();
        setEntry(allEntries);
      } catch (error) {
        console.error(error);
      }
    };
    entries();

    // get category title
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
        const title = await response.json();
        console.log(title)
        setTitle(title.name);
      } catch (error) {
        console.error(error);
      }
    };
    categoryTitle();
  }, [URL, TITLE_URL]);


  return (
    <div>
      <h1>{title}</h1>
        <CatEntries allEntries={allEntries} title={title} />
        <Link to={'/create-entry/' + catId.id} >Create an Entry</Link>
    </div>
  );
};

export default AllEntriesFromCategory;
