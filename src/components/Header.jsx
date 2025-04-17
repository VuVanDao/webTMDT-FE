import React, { useState } from "react";
import {
  Avatar,
  Box,
  CardMedia,
  Divider,
  Tooltip,
  Typography,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LanguageIcon from "@mui/icons-material/Language";
import { Popover } from "@mui/material";
import qrImage from "../assets/qr.png";
import LanguageChange from "./Language/Language";
const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { mode, setMode } = useState();
  console.log(mode);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return (
    <Box
      sx={{
        height: (theme) => theme.customHeight.Header,
        width: "100%",
        bgcolor: "#ee4d2d",
        color: "white",
        p: 0.25,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 1,
        }}
      >
        <Box>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Box>
              <Typography
                aria-owns={open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                sx={{ cursor: "pointer" }}
              >
                Tải ứng dụng
              </Typography>
              <Popover
                id="mouse-over-popover"
                sx={{ pointerEvents: "none" }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Typography sx={{ p: 1 }}>
                  <CardMedia component="img" src={qrImage} height={"120px"} />
                </Typography>
              </Popover>
            </Box>
            <Divider
              orientation="vertical"
              variant="middle"
              sx={{ bgcolor: "white", height: "15px" }}
            />
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Typography>Kết nối</Typography>
              <Tooltip title="facebook">
                <FacebookIcon />
              </Tooltip>
              <Tooltip title="Instagram">
                <InstagramIcon />
              </Tooltip>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
              <NotificationsNoneIcon />
              <Typography>Thông báo</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
              <HelpOutlineIcon />
              <Typography>Hỗ trợ</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
              <LanguageIcon />
              <LanguageChange />
            </Box>
            <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
              <Avatar sx={{ width: 24, height: 24 }} />
              <Typography>VuVanDao</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
