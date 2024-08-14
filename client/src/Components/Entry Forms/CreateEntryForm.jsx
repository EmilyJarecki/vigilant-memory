import React, { useState } from "react";
import { getUserToken } from "../../utils/authToken";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./CreateEntryForm.css";
import "react-datepicker/dist/react-datepicker.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';

const repOptions = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 5, label: 5 },
];

const CreateEntryForm = (props) => {
  const URL = `http://localhost:4000/entry`;
  const token = getUserToken();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onError = (errors, e) => console.log(errors, e);
  const [startDate, setStartDate] = useState(new Date());

  console.log(startDate)
  const onSubmit = async (data, e) => {
    let formattedDate = startDate.$M + 1 + "/" + startDate.$D + "/" + startDate.$y
    console.log(formattedDate)

    console.log("data", data)
    const raw = JSON.stringify({
      category_id: props.categoryId,
      reps: data.reps,
      weight: data.weight,
      notes: data.notes,
      date: formattedDate,
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
      navigate("/entry/" + props.categoryId);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
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
        <div>
          <TextField
            id="standard-basic"
            label="Weight"
            variant="standard"
            {...register("weight")}
          />
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs} {...register("date")}>
            <DatePicker onChange={(newValue) => setStartDate(newValue)}/>
          </LocalizationProvider>
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
        <button type="submit" className="create-entry-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateEntryForm;
