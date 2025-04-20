import React, { useState } from "react";
import {
  Avatar,
  Box,
  Container,
  Divider,
  TextField,
  Tooltip,
  Autocomplete,
  Typography,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LanguageIcon from "@mui/icons-material/Language";
import LanguageChange from "./Language/Language";
import shopeeImg from "../assets/shopee.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import QrShope from "./QRSHOPEE/QrShope";
import CartItem from "./Cart/CartItem";
import MyAccount from "./MyAccount/MyAccount";
import { Link } from "react-router-dom";
import { RecommendData } from "../Data/RecommenData";
import SearchIcon from "@mui/icons-material/Search";
const Header = ({ showHeader }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const [searchValue, setSearchValue] = useState("");
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  if (!showHeader)
    return (
      <Box
        sx={{
          // height: (theme) => theme.customHeight.Header,
          width: "100%",
          bgcolor: (theme) => theme.commonColors,
          color: "white",
          p: 0.25,
        }}
      >
        <Container maxWidth="lg">
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
                  <QrShope anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
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
                  {/* <Avatar sx={{ width: 24, height: 24 }} />
                <Typography>VuVanDao</Typography> */}
                  <MyAccount />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  return (
    <Box
      sx={{
        height: (theme) => theme.customHeight.Header,
        width: "100%",
        bgcolor: (theme) => theme.commonColors,
        color: "white",
        p: 0.25,
      }}
    >
      <Container maxWidth="lg">
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
                <QrShope anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
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
                {/* <Avatar sx={{ width: 24, height: 24 }} />
                <Typography>VuVanDao</Typography> */}
                <MyAccount />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 1,
            alignItems: "center",
          }}
        >
          <Box component={Link} to="/homePage">
            <img
              src={shopeeImg}
              style={{ width: "150px", cursor: "pointer" }}
            />
          </Box>
          <Box>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={RecommendData.map((option) => option.name)}
              renderInput={(params) => (
                <TextField
                  id="outlined-search"
                  {...params}
                  type="search"
                  size="small"
                  // onChange={(e) => handleSearch(e)}
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      type: "search",
                    },
                  }}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ cursor: "pointer" }} />,
                  }}
                  sx={{
                    width: {
                      md: "700px",
                      sm: "400px",
                    },
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: (theme) => theme.commonColor,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                  }}
                />
              )}
            />
          </Box>
          <Box>
            <CartItem />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
