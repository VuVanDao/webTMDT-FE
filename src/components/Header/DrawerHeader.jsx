import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppsIcon from "@mui/icons-material/Apps";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import CastConnectedIcon from "@mui/icons-material/CastConnected";

const DrawerHeader = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <Box
      sx={{ width: 250, display: "flex", gap: 2, flexDirection: "column" }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItemButton>
          <ListItemIcon>
            <CastConnectedIcon />
          </ListItemIcon>
          <ListItemText primary="Kết nối" />
        </ListItemButton>

        <Divider />

        <ListItemButton>
          <ListItemIcon>
            <FacebookIcon />
          </ListItemIcon>
          <ListItemText primary="facebook" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <InstagramIcon />
          </ListItemIcon>
          <ListItemText primary="Instagram" />
        </ListItemButton>
      </List>
    </Box>
  );
  return (
    <Box
      sx={{
        display: {
          mdd: "none",
          xs: "block",
        },
        py: 0.5,
      }}
    >
      <AppsIcon
        onClick={toggleDrawer(true)}
        sx={{ fontSize: "30px", cursor: "pointer" }}
      />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
};

export default DrawerHeader;
