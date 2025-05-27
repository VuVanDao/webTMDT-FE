import { Avatar, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../../redux/slice/userInfoSlice";
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
        >
          <Avatar
            src={userInfo?.avatar}
            sx={{ width: "50px", height: "50px" }}
          />
          <Typography>{userInfo?.username}</Typography>
        </Box>
        <Box sx={{ color: "black" }}>
          <Typography sx={SettingStyles}>
            <NotificationsNoneIcon sx={SettingText} />
            Thông báo
          </Typography>
        </Box>
        <Box sx={{ color: "black" }}>
          <Typography sx={SettingStyles}>
            <PersonOutlineIcon sx={SettingText} />
            Tài khoản của tôi
          </Typography>
        </Box>
        <Box sx={{ color: "black" }}>
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
