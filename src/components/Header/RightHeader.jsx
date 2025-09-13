import { Box, Typography } from "@mui/material";
import React from "react";
import Notification from "../Notification/Notification";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LanguageIcon from "@mui/icons-material/Language";
import LanguageChange from "../Language/Language";
import MyAccount from "../MyAccount/MyAccount";

const RightHeader = () => {
  const commonStyles = {
    display: {
      mdd: "flex",
      xs: "none",
    },
    gap: 0.5,
    alignItems: "center",
  };
  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Box sx={commonStyles}>
          <Notification />
        </Box>
        <Box sx={commonStyles}>
          <HelpOutlineIcon />
          <Typography>Hỗ trợ</Typography>
        </Box>
        <Box sx={commonStyles}>
          <LanguageIcon />
          <LanguageChange />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            alignItems: "center",
            cursor: "pointer",
            py: {
              xs: 1,
            },
          }}
        >
          <MyAccount />
        </Box>
      </Box>
    </Box>
  );
};

export default RightHeader;
