import React, { useState } from "react";
import { Box, Divider, Tooltip, Typography } from "@mui/material";
import QrShope from "../QRSHOPEE/QrShope";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import DrawerHeader from "./DrawerHeader";

const LeftHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
      }}
    >
      {/* download app */}
      <Box
        sx={{
          display: {
            mdd: "block",
            xs: "none",
          },
        }}
      >
        <Typography
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          sx={{ cursor: "pointer" }}
        >
          Tải ứng dụng
        </Typography>
        <QrShope anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      </Box>

      <Divider
        orientation="vertical"
        variant="middle"
        sx={{
          bgcolor: "white",
          height: "15px",
          display: {
            mdd: "block",
            xs: "none",
          },
        }}
      />

      {/* connect */}
      <Box
        sx={{
          display: {
            mdd: "flex",
            xs: "none",
          },
          gap: 1,
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Typography>Kết nối</Typography>
        <Tooltip title="facebook">
          <FacebookIcon />
        </Tooltip>
        <Tooltip title="Instagram">
          <InstagramIcon />
        </Tooltip>
      </Box>

      <DrawerHeader />
    </Box>
  );
};

export default LeftHeader;
