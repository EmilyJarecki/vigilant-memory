import React, { useEffect, useState } from "react";
import { getPersonalEntryByCategoryAndReps } from "../../Services/categoryService";
import {
  Switch,
  FormGroup,
  FormControlLabel,
  ButtonGroup,
  Button,
} from "@mui/material";
import Chart from "./LineChart";
import LineChart from "./LineChart";
import CatEntries from "./EntryTable";
import Pr from "./Pr";

const repOptions = [1, 2, 3, 4, 5, 10];

const LiftByReps = (props) => {
  const categoryId = props.categoryId;
  const [chosenRep, setChosenRep] = useState(1);
  const [filteredEntries, setFilteredEntries] = useState([]); // this needs to be organized by milliseconds
  const [isLineSwitchChecked, setIsLineSwitchChecked] = useState(true); // State for Switch
  const [isTableSwitchChecked, setIsTableSwitchChecked] = useState(true); // State for Switch

  const organized = filteredEntries.sort(
    (a, b) => a.milliseconds - b.milliseconds
  );
  const handleLineSwitchChange = (event) => {
    setIsLineSwitchChecked(event.target.checked);
  };
  const handleTableSwitchChange = (event) => {
    setIsTableSwitchChecked(event.target.checked);
  };

  useEffect(() => {
    const filterReps = async () => {
      try {
        const entry = await getPersonalEntryByCategoryAndReps(
          categoryId,
          chosenRep
        );
        setFilteredEntries(entry);
      } catch (error) {
        console.error("Error fetching entries: ", error);
      }
    };
    filterReps();
  }, [categoryId, chosenRep]);

  let maxObj;
  let maxWeight = 0;

  if (organized && organized.length > 0) {
    for (let i = 0; i < organized.length; i++) {
      if (organized[i].weight > maxWeight) {
        maxWeight = organized[i].weight;
        maxObj = organized[i];
      }
    }
  }
  console.log("MaxObj", maxObj);

  return (
    <div>
      {/* REP OPTIONS */}
      <div className="mt-12">
        <ButtonGroup variant="contained" aria-label="Basic button group">
          {repOptions.map((repOpt) => (
            <Button onClick={() => setChosenRep(repOpt)}>{repOpt}</Button>
          ))}
        </ButtonGroup>
      </div>
      {filteredEntries.length > 0 && <Pr maxObj={maxObj} />}

      <div className="flex justify-center">
        {filteredEntries.length > 0 && (
          <FormGroup className="flex justify-center">
            <FormControlLabel
              control={
                <Switch
                  checked={isLineSwitchChecked}
                  onChange={handleLineSwitchChange}
                />
              }
              label="View Linear Graph"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={isTableSwitchChecked}
                  onChange={handleTableSwitchChange}
                />
              }
              label="View Table"
            />
          </FormGroup>
        )}
      </div>

      <div className="flex justify-center flex-wrap gap-[50px] mt-4">
        {/* SHOWING TABLE */}
        <div className="">
          {filteredEntries.length > 0 ? (
            <div className="w-[300px]">
              {isTableSwitchChecked && filteredEntries.length > 0 && (
                <CatEntries
                  organizedEntries={organized}
                  chosenRep={chosenRep}
                />
              )}
            </div>
          ) : (
            <p className="text-indigo-500">No entries found</p>
          )}
        </div>
        {/* SHOWING LINE CHART */}
        <div className="w-[500px]">
          {isLineSwitchChecked && filteredEntries.length > 0 && (
            <div className="">
              <LineChart organizedEntries={organized} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiftByReps;
