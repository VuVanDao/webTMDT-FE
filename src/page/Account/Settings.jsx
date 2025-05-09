import { Avatar, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
const Settings = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);
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
          }}
        >
          <Avatar src={user?.avatar} sx={{ width: "50px", height: "50px" }} />
          <Typography>{user?.username}</Typography>
        </Box>
        <Box>
          <Typography sx={SettingStyles}>
            <NotificationsNoneIcon sx={SettingText} />
            Thông báo
          </Typography>
        </Box>
        <Box>
          <Typography sx={SettingStyles}>
            <PersonOutlineIcon sx={SettingText} />
            Tài khoản của tôi
          </Typography>
        </Box>
        <Box>
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
