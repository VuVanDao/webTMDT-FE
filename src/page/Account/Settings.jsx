import { Avatar, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import LockIcon from "@mui/icons-material/Lock";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../../redux/slice/userInfoSlice";
import { useNavigate } from "react-router-dom";
const Settings = () => {
  const userInfo = useSelector(userInfoSelector);
  useEffect(() => {}, []);
  const SettingStyles = {
    display: "flex",
    alignItems: "center",
    gap: 1,
  };
  const SettingText = {
    color: (theme) => theme.commonColors,
    fontSize: "30px",
  };
  const navigate = useNavigate();
  const handleGetPurchase = () => {
    navigate("purchase");
  };
  const handleGetInfo = () => {
    navigate("MyAccount");
  };
  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            color: "black",
          }}
          onClick={handleGetInfo}
        >
          <Avatar
            src={userInfo?.avatar}
            sx={{ width: "50px", height: "50px" }}
          />
          <Typography>{userInfo?.username}</Typography>
        </Box>

        <Box sx={{ color: "black", cursor: "pointer" }} onClick={handleGetInfo}>
          <Typography sx={SettingStyles}>
            <PersonOutlineIcon sx={SettingText} />
            Tài khoản của tôi
          </Typography>
        </Box>
        <Box
          sx={{ color: "black", cursor: "pointer" }}
          onClick={() => navigate("changePassword")}
        >
          <Typography sx={SettingStyles}>
            <LockIcon sx={SettingText} />
            Đổi mật khẩu
          </Typography>
        </Box>
        <Box
          sx={{ color: "black", cursor: "pointer" }}
          onClick={handleGetPurchase}
        >
          <Typography sx={SettingStyles}>
            <ContentPasteIcon sx={SettingText} />
            Đơn mua
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
