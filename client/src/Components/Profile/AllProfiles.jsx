import React, { useEffect, useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Avatar,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { addFriend } from "../../Services/profileService";
import { Link } from "react-router-dom";

const AllProfiles = ({ allExceptSelf }) => {
  const [profiles, setProfiles] = useState([]);
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (allExceptSelf) {
      setProfiles(allExceptSelf);
    }
  }, [allExceptSelf]);

  const addAsFriend = async (id) => {
    try {
      await addFriend(id);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  return (
    <div>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="All Profiles" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {profiles.map((elem) => (
              <div key={elem._id}>
              <Link to={`/external-user/${elem._id}`}>
                <ListItemButton key={elem._id} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Avatar>{elem.firstName.slice(0, 1)} </Avatar>
                  </ListItemIcon>
                  <ListItemText primary={elem.firstName} />
                </ListItemButton>
              </Link>
                <button onClick={() => addAsFriend(elem._id)}>+ Add {elem.firstName} as Friend</button>

              </div>
            ))}
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default AllProfiles;
