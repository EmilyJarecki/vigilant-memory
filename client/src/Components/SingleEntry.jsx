import React, { useEffect, useState } from "react";
import { getUserToken } from "../utils/authToken";
import { Link } from "react-router-dom";
import UpdateForm from "./UpdateForm";
import { useNavigate } from "react-router-dom";

const SingleEntry = (props) => {
  const { _id, category_id, reps, notes, date, weight } = props.individualLift || {};
  const ENTRY_URL = `http://localhost:4000/entry/${_id}`
  const TITLE_URL = `http://localhost:4000/category/${category_id}`;
  const [title, setTitle] = useState(null);
  const token = getUserToken();
  const [userWantsToUpdate, setUserWantsToUpdate] = useState(false);
  const navigate = useNavigate()

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

  const deleteEntry = async () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      redirect: "follow",
    };

    try {
      const response = await fetch(ENTRY_URL, requestOptions);
      const result = await response.json();
      console.log(result) 
      navigate(`/entry/${category_id}`)
      // navigate(`/entry/${category_id}`)   
    } catch (error) {
      console.error(error);
    }
  };


  // category_id, notes, date, weight
  const propsObj = {
    entry_id: _id,
    category_id: category_id,
    reps: reps,
    notes: notes,
    date: date,
    weight: weight,
  };

  return (
    <div>
      <Link to={`/entry/${props.individualLift.category_id}`}>
        <button>Back</button>
      </Link>
      {userWantsToUpdate === false ? (
        <div>
          <button onClick={() => setUserWantsToUpdate(true)}>
            I want to UPDATE
          </button>
          <button onClick={() => deleteEntry()}>
            I want to DELETE
          </button>
          <h1>{title}</h1>
          <p>REPS: {reps}</p>
          <p>WEIGHT: {weight}</p>
          <p>DATE: {date}</p>
          <p>NOTES: {notes}</p>
        </div>
      ) : (
        <div>
          <h1>Update TIME!</h1>
          <UpdateForm {...propsObj} />
        </div>
      )}
    </div>
  );
};

export default SingleEntry;
