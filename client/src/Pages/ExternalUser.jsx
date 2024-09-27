import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CircularProgress,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import {
  getSpecificProfile,
  getSpecificProfileCategoryReps,
  addFriend,
  removeFriend,
} from "../Services/profileService";
import ExternalUserEntries from "../Components/ExternalUserEntries";
import ExternalUserFriendshipCheck from "../Components/ExternalUserFriendshipCheck";

const reps = [1, 2, 3, 4, 5, 10];

const ExternalUser = (props) => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [entries, setEntries] = useState([]);
  const [categoryChoice, setCategoryChoice] = useState("");
  const [repChoice, setRepChoice] = useState("");
  const [userFriendArr, setFriends] = useState([]);

  const handleChange = (event) => {
    setCategoryChoice(event.target.value);
  };

  const handleRepChange = (event) => {
    setRepChoice(event.target.value);
  };

  const isFriend = (id) => {
    return userFriendArr.some((friend) => friend._id === id);
  };

  const addAsFriend = async (id) => {
    try {
      await addFriend(id);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const unfriend = async (id) => {
    try {
      await removeFriend(id);
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  useEffect(() => {
    function loading() {
      if (!props.categoryList) {
        return (
          <div>
            <CircularProgress color="secondary" />
          </div>
        );
      }
    }
    loading();
  }, [props.maxObj]);

  useEffect(() => {
    const getExternalUser = async () => {
      try {
        const individual = await getSpecificProfile(id);
        setUser(individual);
      } catch (error) {
        console.error(error);
      }
    };
    getExternalUser();
  }, [id]);

  useEffect(() => {
    const getEntrySpecifics = async (id, categoryChoice, repChoice) => {
      console.log("I made it!");
      try {
        const response = await getSpecificProfileCategoryReps(
          id,
          categoryChoice,
          repChoice
        );
        setEntries(response);
      } catch (error) {
        console.error(error);
      }
    };
    if (categoryChoice !== "" && repChoice !== "")
      getEntrySpecifics(id, categoryChoice, repChoice);
  }, [id, categoryChoice, repChoice]);

  return (
    <div>
      <div>
        <ExternalUserFriendshipCheck id={id} userInfo={props?.userInfo}/>
      </div>
      <h1>Lifts for: </h1>
      <div>
        {user.firstName} {user.lastName}
      </div>
      <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Lift</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={categoryChoice}
            onChange={handleChange}
            label="Lift"
          >
            {props.categoryList.map((elem) => (
              <MenuItem key={elem._id} value={elem._id}>
                {elem.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Reps</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={repChoice}
          onChange={handleRepChange}
          label="Lift"
        >
          {reps.map((elem) => (
            <MenuItem key={elem} value={elem}>{elem}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <div>
        {categoryChoice === "" && repChoice === "" ? null : (
          <div>
            {entries.length === 0 &&
            categoryChoice !== "" &&
            repChoice !== "" ? (
              <p>No Entries Recorded</p>
            ) : (
              <div>
                <ExternalUserEntries entries={entries} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExternalUser;
