import React from "react";
import { useEffect } from "react";
import { getUserToken } from "../utils/authToken";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {FormGroup, Label, Input, Col} from 'reactstrap'

const CreateEntry = () => {
  const token = getUserToken();
  const URL = "http://localhost:4000/";

  const { register, handleSubmit } = useForm();
  const onError = (errors, e) => console.log(errors, e);

  const onSubmit = async (data, e) => {
    console.log(data)
    return 
    const { fruit, subFruit, rating, season } = data;
    const raw = JSON.stringify({fruit, subFruit, rating, season});

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(URL, requestOptions);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {}, [token]);

  return (
    <div>
      {/* <button onClick={createEntry}>Click me</button> */}
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div>
          <label htmlFor="lift">Lift</label>
          <input {...register("lift")} />
        </div>
        <div>
          <label htmlFor="weight">Weight (lbs)</label>
          <input {...register("weight")} />
        </div>
        <div>
          <label htmlFor="notes">Notes</label>
          <input {...register("notes")} />
        </div>
        <div>
          <label htmlFor="difficulty">Difficulty</label>
          <input {...register("difficulty")} type="range" min="0" max="5" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateEntry;
