import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getUserToken } from "../utils/authToken";
import CategoryEntries from "../Components/CategoryEntries";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import EntryLineGraph from "../Components/SingleEntryBox";

const AllEntriesFromCategory = () => {
  const token = getUserToken();
  const [allEntries, setEntry] = useState(null);
  const [title, setTitle] = useState(null);
  const { id } = useParams();
  const URL = `http://localhost:4000/entry/${id}`;
  const TITLE_URL = `http://localhost:4000/category/${id}`;
  const catId = { id };

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
        console.log(title);
        setTitle(title.name);
      } catch (error) {
        console.error(error);
      }
    };
    categoryTitle();
  }, [URL, TITLE_URL]);

  return (
    <div>
      <h1 class="text-3xl font-black p-4 uppercase font-bold text-[#3f1abb] tracking-[5px]">{title}</h1>
      <Link to={"/dashboard"}>
        <Button color="primary" outline className="mb-4 me-2">
          Back to Dashboard
        </Button>
      </Link>
      <Link to={"/create-entry/" + catId.id}>
        <Button color="primary" className="mb-4 ms-4">
          Create an Entry
        </Button>
      </Link>
      <CategoryEntries allEntries={allEntries} title={title} />
    </div>
  );
};

export default AllEntriesFromCategory;
