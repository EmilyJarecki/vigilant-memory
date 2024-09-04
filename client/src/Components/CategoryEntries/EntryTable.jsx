import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const ITEM_HEIGHT = 48; // Adjust based on your MenuItem height

const CatEntries = ({ organizedEntries, chosenRep }) => {
  const [openRow, setOpenRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRowId, setCurrentRowId] = useState(null);

  const handleRowClick = (index) => {
    setOpenRow(openRow === index ? null : index);
  };

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setCurrentRowId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentRowId(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'long-menu' : undefined;

  useEffect(() => {
    function loading() {
      if (!organizedEntries || !chosenRep) {
        return (
          <div>
            <CircularProgress color="secondary" />
          </div>
        );
      }
    }
    loading();
  }, [organizedEntries, chosenRep]);

  return (
    <div class="mt-4">
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Date</TableCell>
              <TableCell align="right">Weight</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {organizedEntries.map((row, index) => (
              <React.Fragment key={row._id}>
                <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleRowClick(index)}
                    >
                      {openRow === index ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell align="right">{row.weight}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? "long-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={(event) => handleClick(event, row._id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      MenuListProps={{
                        "aria-labelledby": "long-button",
                      }}
                      anchorEl={anchorEl}
                      open={open && currentRowId === row._id}
                      onClose={handleClose}
                      slotProps={{
                        paper: {
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: "20ch",
                          },
                        },
                      }}
                    >
                      <MenuItem onClick={handleClose}>
                        <Link to={`/single-entry/${row._id}`}>
                          View Details
                        </Link>
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={4}
                  >
                    <Collapse
                      in={openRow === index}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom component="div">
                          Notes
                        </Typography>
                        {row.notes=== "" ? <p>No notes avaliable</p> : <p>{row.notes}</p>}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CatEntries;
