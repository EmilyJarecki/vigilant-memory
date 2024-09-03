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

  return (
    <div>
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
            {profiles.map((elem) => (
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Avatar>{elem.firstName.slice(0, 1)} </Avatar>
                </ListItemIcon>
                <ListItemText primary={elem.firstName} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default AllProfiles;
