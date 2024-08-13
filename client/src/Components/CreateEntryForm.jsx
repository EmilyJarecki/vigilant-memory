import React from "react";
import { getUserToken } from "../utils/authToken";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateEntryForm = (props) => {
  const URL = `http://localhost:4000/entry`;
  const token = getUserToken();
const navigate = useNavigate()
  const { register, handleSubmit } = useForm();
  const onError = (errors, e) => console.log(errors, e);

  const onSubmit = async (data, e) => {

    const raw = JSON.stringify({
      category_id: props.categoryId,
      weight: data.weight,
      notes: data.notes,
      date: data.date,
    });

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
      navigate("/entry/" + props.categoryId)
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div>
          <label htmlFor="weight">Weight (lbs)</label>
          <input {...register("weight")} />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input {...register("date")} />
        </div>
        <div>
          <label htmlFor="notes">Notes</label>
          <input {...register("notes")} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateEntryForm;
