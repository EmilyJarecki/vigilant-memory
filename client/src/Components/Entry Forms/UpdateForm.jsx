import React, { useState } from "react";
import { getUserToken } from "../../utils/authToken";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateForm.css";
import "react-datepicker/dist/react-datepicker.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const repOptions = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 10, label: 10 },
];

const UpdateForm = (props) => {
  const token = getUserToken();
  const [startDate, setStartDate] = useState(new Date());
  const { id } = useParams();
  const navigate = useNavigate();
  const URL = `http://localhost:4000/entry/${id}`;
  const { register, handleSubmit } = useForm();
  const onError = (errors, e) => console.log(errors, e);

  console.log(startDate)

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
      navigate("/entry/" + props.category_id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit, onError)}
      class="w-1/2 shadow-2xl shadow-indigo-500/100"
      >

        <div class="m-4">
          <LocalizationProvider  {...register("date")} dateAdapter={AdapterDayjs}>
            <DatePicker onChange={(newValue) => setStartDate(newValue)} />
          </LocalizationProvider>
        </div>

        <TextField
            id="standard-select-currency"
            select
            label="Reps"
            defaultValue={props.reps}
            helperText="Please select the rep amount"
            variant="standard"
            {...register("reps")}
          >
            {repOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

        <div class="m-4">
          <TextField
            label="Weight"
            id="standard-basic"
            variant="standard"
            {...register("weight")}
            helperText="Please input weight"
            defaultValue={props.weight}
          />
        </div>

        <div>
          <TextField
            id="filled-multiline-flexible"
            label="Notes"
            multiline
            variant="standard"
            {...register("notes")}
            className="notes-textbox"
            defaultValue={props.notes}
          />
        </div>

        <div class="flex justify-center mb-4">
          <button type="submit" className="update-entry-button">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
