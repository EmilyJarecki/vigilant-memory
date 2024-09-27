import React, { useState, useEffect } from "react";
import { removeFriend } from "../../Services/profileService";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Avatar,
  Paper
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";

const UserFriends = ({ userFriends }) => {
  console.log(userFriends);
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      {userFriends?.length > 0 ? (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton onClick={handleClick}>
            <ListItemText primary="Friends" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {userFriends.map((elem) => (
                <div key={elem._id}>
                  <Link to={`/external-user/${elem._id}`}>
                    <ListItemButton key={elem._id} sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <Avatar>{elem.firstName.slice(0, 1)} </Avatar>
                      </ListItemIcon>
                      <ListItemText primary={elem.firstName} />
                    </ListItemButton>
                  </Link>
                </div>
              ))}
            </List>
          </Collapse>
        </List>
      ) : (
        <p>No friends to display.</p>
      )}
    </div>
  );
};

export default UserFriends;
