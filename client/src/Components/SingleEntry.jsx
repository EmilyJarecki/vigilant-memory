import React, { useEffect, useState } from "react";
import { getUserToken } from "../utils/authToken";
import { Link } from "react-router-dom";

const SingleEntry = (props) => {
  const { category_id, notes, date, weight } = props.individualLift || {};
  const TITLE_URL = `http://localhost:4000/category/${category_id}`;
  const [title, setTitle] = useState(null);
  const token = getUserToken();
  const [userWantsToUpdate, setUserWantsToUpdate] = useState(false)
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
        const title = await response.json();
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
      <Link to={`/entry/${props.individualLift.category_id}`}>
        <button>Back</button>
      </Link>
      {userWantsToUpdate === false ?
(<div>
      <button onClick={()=>setUserWantsToUpdate(true)}>I want to UPDATE</button>
        <h1>{title}</h1>
        {notes} <br></br>
        {date} <br></br>
        {weight}
      </div>) : 
      <div>
      <h1>Update TIME!</h1>
      </div>
      }
      
    </div>
  );
};

export default SingleEntry;
