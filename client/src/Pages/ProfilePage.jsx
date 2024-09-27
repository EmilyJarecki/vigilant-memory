import React, { useState, useEffect } from "react";
import * as authService from "../Services/authService";
import * as profileService from "../Services/profileService";
import { CircularProgress } from "@mui/material";
import UserFriends from "../Components/Profile/UserFriends";
import IndividualInfo from "../Components/Profile/IndividualInfo";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Avatar,
  Paper,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";

// this page always needs to refresh in order to see the new user which is PROBLEMATIC
const ProfilePage = (props) => {
  const [userFriendArr, setFriends] = useState([]);
  const [user, setUser] = useState(authService.getUser());
  const [open, setOpen] = useState(true);
  const [userProfile, setUserProfile] = useState(profileService.show());

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchUserFriends = async () => {
      try {
        const userFriend = await profileService.getUserFriends();
        setFriends(userFriend.friends);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserFriends();

    const fetchProfile = async () => {
      try {
        console.log(user);
        const profileData = await profileService.show(user);
        console.log(profileData);
        setUserProfile(profileData.user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [user]);

  console.log(userProfile);
  // friending
  const addAsFriend = async (id) => {
    try {
      const res = await profileService.addFriend(id);
      // Update the friends state to include the new friend
      setFriends(res.user.friends);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const unfriend = async (id) => {
    try {
      await profileService.removeFriend(id);
      // Remove the friend from the list if successfully removed
      setFriends(userFriendArr.filter((friend) => friend._id !== id));
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  const isFriend = (id) => {
    return userFriendArr.some((friend) => friend._id === id);
  };

  return (
    <div class="flex justify-center flex-wrap">
      <IndividualInfo userInfo={userProfile} />

      <div class="m-8">
      <Paper className="w-[336px] mb-8" variant="elevation">
      <UserFriends userFriends={userFriendArr} />
      </Paper>

        <Paper className="w-[336px]" variant="elevation">
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton onClick={handleClick}>
              <ListItemText primary="All Profiles" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={!open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {props?.allExceptSelf.map((elem) => (
                  <div key={elem._id} className="flex">
                    <Link to={`/external-user/${elem._id}`} className="flex">
                      <ListItemButton key={elem._id} sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <Avatar>{elem.firstName.slice(0, 1)} </Avatar>
                        </ListItemIcon>
                        <ListItemText primary={elem.firstName} />
                      </ListItemButton>
                    </Link>
                    {isFriend(elem._id) ? (
                      <button onClick={() => unfriend(elem._id)}>
                        Remove <RemoveCircleOutlineIcon />
                      </button>
                    ) : (
                      <button onClick={() => addAsFriend(elem._id)}>
                        Add <AddCircleOutlineIcon />
                      </button>
                    )}
                  </div>
                ))}
              </List>
            </Collapse>
          </List>
        </Paper>
      </div>
    </div>
  );
};

export default ProfilePage;
