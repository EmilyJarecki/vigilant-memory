import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateForm.css";
import "react-datepicker/dist/react-datepicker.css";
import { TextField, MenuItem } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs"; // Import dayjs for date manipulation
import { updateEntry } from "../../Services/entryService";

const repOptions = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 10, label: 10 },
];

const UpdateForm = (props) => {
  const [startDate, setStartDate] = useState(dayjs()); // Initialize with the current date
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  
  // Convert the date prop to a Dayjs object when props change
  useEffect(() => {
    if (props.date) {
      const parsedDate = dayjs(props.date, 'M/D/YYYY');
      setStartDate(parsedDate);
    }
  }, [props.date]); // Dependency array ensures this runs when props.date changes

  const onError = (errors, e) => console.log(errors, e);

  const onSubmit = async (data) => {
    // Format the date using Dayjs
    const formattedDate = startDate.format('M/D/YYYY');
    const raw = {
      category_id: props.category_id,
      reps: data.reps,
      weight: data.weight,
      notes: data.notes,
      date: formattedDate,
    };

    try {
      const response = await updateEntry(raw, id);
      console.log(response);
      navigate("/entry/" + props.category_id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="shadow-2xl shadow-indigo-500/100"
      >
        <div className="m-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>

        <div className="m-4">
          <TextField
            id="standard-select-reps"
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
        </div>

        <div className="m-4">
          <TextField
            label="Weight"
            id="standard-basic"
            variant="standard"
            {...register("weight")}
            helperText="Please input weight"
            defaultValue={props.weight}
          />
        </div>

        <div className="m-4">
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

        <div className="flex justify-center mb-4">
          <button type="submit" className="update-entry-button">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
