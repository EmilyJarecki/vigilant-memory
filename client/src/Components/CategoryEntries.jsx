// THIS IS WORKING
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SingleEntryBox from "./SingleEntryBox";

const CatEntries = (props) => {
  const repOptions = [1, 2, 3, 4, 5, 10];
  useEffect(() => {
    function loading() {
      if (!props.allEntries || !props.title) {
        return <div>Loading...</div>; // Or some loading indicator
      }
    }
    loading();
  }, [props.allEntries]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredEntries = selectedCategory
    ? props.allEntries.filter((p) => p.reps === selectedCategory)
    : props.allEntries;

  return (
    <div>
      <h1>Organized</h1>
      <ul>
        {repOptions.map((repOpt) => (
          <li key={repOpt}>
            <a
              className="link view-by"
              href="#"
              onClick={() => setSelectedCategory(repOpt)}
            >
              {repOpt}
            </a>
          </li>
        ))}
      </ul>
      {selectedCategory ? (
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Weight</TableCell>
                  <TableCell align="right">Reps</TableCell>
                  <TableCell align="right">Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEntries?.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.date}
                    </TableCell>
                    <TableCell align="right">{row.weight}</TableCell>
                    <TableCell align="right">{row.reps}</TableCell>
                    <TableCell align="right">{row.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : null}
    </div>
  );
};

export default CatEntries;
