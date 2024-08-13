import React from "react";
import { getUserToken } from "../utils/authToken";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UpdateForm = (props) => {
  const token = getUserToken();
  const { id } = useParams();
  const navigate = useNavigate()
  const URL = `http://localhost:4000/entry/${id}`
  const { register, handleSubmit } = useForm();
  const onError = (errors, e) => console.log(errors, e);


  
  const onSubmit = async (data, e) => {
    const raw = JSON.stringify({
      category_id: props.category_id,
      reps: data.reps,
      weight: data.weight,
      notes: data.notes,
      date: data.date,
    });

    const requestOptions = {
      method: "PUT",
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
      navigate("/entry/" + props.category_id)
    } catch (error) {
      console.error(error);
    }
  }

  
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div>
          <label htmlFor="reps">Reps </label>
          <input {...register("reps")} defaultValue={props.reps} />
        </div>
        <div>
          <label htmlFor="weight">Weight </label>
          <input {...register("weight")} defaultValue={props.weight} />
        </div>
        <div>
          <label htmlFor="notes">Notes</label>
          <input {...register("notes")} defaultValue={props.notes} />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input {...register("date")} defaultValue={props.date} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateForm;
