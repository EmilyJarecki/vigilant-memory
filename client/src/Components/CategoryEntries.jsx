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
import TablePagination from "@mui/material/TablePagination";

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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredEntries = selectedCategory
    ? props.allEntries.filter((p) => p.reps === selectedCategory)
    : props.allEntries;

  let columns = [
    { id: "date", label: "Date", minWidth: 100 },
    { id: "weight", label: "Weight", minWidth: 100 },
    { id: "reps", label: "Reps", minWidth: 100 },
    { id: "notes", label: "Notes", minWidth: 170 },
  ];
  return (
    <div>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        {repOptions.map((repOpt) => (
          <a
            className="link view-by"
            href="#"
            onClick={() => setSelectedCategory(repOpt)}
          >
            <Button>{repOpt} rep</Button>
          </a>
        ))}
      </ButtonGroup>
<div class="me-24 ms-24 mt-8">
      {selectedCategory ? (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer  sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEntries
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Link
                                to={`/single-entry/${row._id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "inherit",
                                }}
                              >
                                <div>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </div>
                              </Link>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredEntries.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : null}
      </div>
    </div>
  );
};

export default CatEntries;
