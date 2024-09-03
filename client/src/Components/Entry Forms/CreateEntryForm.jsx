import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import "./CreateEntryForm.css";
import "react-datepicker/dist/react-datepicker.css";
import {TextField, MenuItem} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { createEntry } from "../../Services/entryService"

const repOptions = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 10, label: 10 },
];

const CreateEntryForm = (props) => {
  console.log(props)
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onError = (errors, e) => console.log(errors, e);
  const [startDate, setStartDate] = useState(new Date());

  const onSubmit = async (data) => {
    let formattedDate = startDate.$M + 1 + "/" + startDate.$D + "/" + startDate.$y;
    const raw = {
      category_id: props.categoryId,
      reps: data.reps,
      weight: data.weight,
      notes: data.notes,
      date: formattedDate,
    }

    try {
      const response = await createEntry(raw)
      console.log(response);
      // this isn't navigating correctly
      navigate("/entry/" + props.categoryId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        class="w-1/2 shadow-2xl shadow-indigo-500/100"
      >
        <div class="m-4">
          <LocalizationProvider
            {...register("date")}
            dateAdapter={AdapterDayjs}
          >
            <DatePicker onChange={(newValue) => setStartDate(newValue)} />
          </LocalizationProvider>
        </div>
        <div>
          <TextField
            id="standard-select-currency"
            select
            label="Reps"
            defaultValue="1"
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
        </div>
        <div class="m-4">
          <TextField
            label="Weight"
            id="standard-basic"
            variant="standard"
            {...register("weight", {valueAsNumber: true})}
            helperText="Please input weight"
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
          />
        </div>
        <div class="flex justify-center mb-4">
          <button type="submit" className="create-entry-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEntryForm;
