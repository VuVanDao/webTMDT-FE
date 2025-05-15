import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useNavigate } from "react-router-dom";
import { logoutUserAPI } from "../../api";
import { toast } from "react-toastify";
const MyAccount = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/signin");
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    logoutUserAPI().then((res) => {
      toast.success(res);
      navigate("/login");
    });
  };
  const handleAccount = () => {
    navigate("/MyAccount");
  };
  if (!user) {
    return (
      <>
        <Tooltip
          title={"your profile"}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ color: "white", p: "0", cursor: "pointer" }}
        >
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Avatar sx={{ width: 24, height: 24 }} />
            <Typography>Tài khoản</Typography>
          </Box>
        </Tooltip>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleLogin}>
            <ListItemIcon>
              <LoginIcon fontSize="small" />
            </ListItemIcon>
            Đăng nhập
          </MenuItem>
          <MenuItem onClick={handleRegister}>
            <ListItemIcon>
              <AppRegistrationIcon fontSize="small" />
            </ListItemIcon>
            Đăng kí
          </MenuItem>
        </Menu>
      </>
    );
  }
  return (
    <>
      <Tooltip
        title={"your profile"}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "white", p: "0", cursor: "pointer" }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Avatar sx={{ width: 24, height: 24 }} src={user?.avatar} />
          <Typography>{user?.username}</Typography>
        </Box>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleAccount} sx={{ display: "flex", gap: 1 }}>
          <Avatar sx={{ width: 24, height: 24 }} src={user?.avatar} /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default MyAccount;
