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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUserAPI,
  userInfoSelector,
} from "../../redux/slice/userInfoSlice";
const MyAccount = ({ color }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const userInfo = useSelector(userInfoSelector);
  const dispatch = useDispatch();
  useEffect(() => {}, []);
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
    dispatch(logoutUserAPI()).then((res) => {
      toast.success(res);
      navigate("/login");
    });
  };
  const handleAccount = () => {
    navigate("/MyAccount");
  };
  const registerShop = () => {
    navigate("/register_shop");
  };
  if (!userInfo) {
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
          <Avatar sx={{ width: 24, height: 24 }} src={userInfo?.avatar} />
          {color ? (
            <Typography sx={{ color: "black" }}>
              {userInfo?.username}
            </Typography>
          ) : (
            <Typography>{userInfo?.username}</Typography>
          )}
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
        <MenuItem onClick={handleAccount}>
          <ListItemIcon>
            <Avatar sx={{ width: 24, height: 24 }} src={userInfo?.avatar} />{" "}
          </ListItemIcon>
          Profile
        </MenuItem>
        {userInfo.role === "shop_owner" ? (
          <MenuItem onClick={() => navigate("/shop_detail")}>
            <ListItemIcon>
              <ShoppingCartIcon fontSize="small" />
            </ListItemIcon>
            Cửa hàng của tôi
          </MenuItem>
        ) : (
          <MenuItem onClick={registerShop}>
            <ListItemIcon>
              <DriveFileRenameOutlineIcon fontSize="small" />
            </ListItemIcon>
            Đăng kí mở shop
          </MenuItem>
        )}
        {userInfo.role === "admin" && (
          <MenuItem
            onClick={() => {
              navigate("/admin");
            }}
          >
            <ListItemIcon>
              <AdminPanelSettingsIcon fontSize="small" />
            </ListItemIcon>
            Trang quản lí
          </MenuItem>
        )}
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
