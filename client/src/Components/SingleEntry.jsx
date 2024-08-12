import React, { useEffect, useState } from "react";
import { getUserToken } from "../utils/authToken";

const SingleEntry = (props) => {
  const { category_id, notes, date, weight } = props.individualLift || {};
  const TITLE_URL = `http://localhost:4000/category/${category_id}`;
  // console.log(props.individualLift.notes)
  const [title, setTitle] = useState(null)
  const token = getUserToken();

  useEffect(() => {
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
        console.log(response);
        const title = await response.json();
        console.log("Title:", title.name);
        setTitle(title.name);
      } catch (error) {
        console.error(error);
      }
    };
    categoryTitle();
  }, [TITLE_URL]);

  if (!props.individualLift || !title) {
    return <div>Loading...</div>; // Or some loading indicator
  }


  return (
    <div>
      <div>
      <h1>{title}</h1>
        {notes} <br></br>
        {date} <br></br>
        {weight}
      </div>
    </div>
  );
};

export default SingleEntry;
