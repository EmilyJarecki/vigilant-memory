import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const SingleEntryBox = (props) => {
  console.log(props.entry);

  return (
    <div>
      {props.entry.weight} at {props.entry.reps} on date {props.entry.date}

    </div>
  );
};

export default SingleEntryBox;
