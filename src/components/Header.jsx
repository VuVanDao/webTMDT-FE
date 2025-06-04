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
  Button,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LanguageIcon from "@mui/icons-material/Language";
import LanguageChange from "./Language/Language";
import shopeeImg from "../assets/shopee.png";
import QrShope from "./QRSHOPEE/QrShope";
import CartItem from "./Cart/CartItem";
import MyAccount from "./MyAccount/MyAccount";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Notification from "./Notification/Notification";
import { fetchProductAPI } from "../api";
import { useDebounceFn } from "../customHook/useDebounceFn";

const Header = ({ showHeader }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [resultSearch, setResultSearch] = useState([]);
  const [searchType, setSearchType] = useState([]);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    if (!searchValue) return;
    setSearchType(searchValue);
    const searchPath = `?${createSearchParams({ "q[name]": searchValue })}`;
    fetchProductAPI(searchPath).then((res) => {
      setResultSearch(res || []);
    });
  };
  const debounceSearchProduct = useDebounceFn(handleSearch);
  const handleFindItem = (value) => {
    navigate(`/search?value=${value?.name ? value?.name : searchType}`, {
      state: { results: resultSearch ? resultSearch : searchType },
    });
  };
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
          minWidth: "100vw !important",
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
                  <Notification />
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
        minWidth: "1200px !important",
        bgcolor: (theme) => theme.commonColors,
        color: "white",
        p: 0.25,
        position: "sticky",
        top: 0,
        zIndex: 10,
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
              <Box
                sx={{
                  display: "flex",
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
            </Box>
          </Box>
          <Box>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                <Notification />
              </Box>
              <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                <HelpOutlineIcon />
                <Typography>Hỗ trợ</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                <LanguageIcon />
                <LanguageChange />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 0.5,
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button sx={{ color: "white" }} onClick={handleFindItem}>
              <SearchIcon sx={{ cursor: "pointer" }} />
            </Button>

            <Autocomplete
              size="small"
              options={
                resultSearch.map((product) => {
                  return product?.name;
                }) || []
              }
              filterOptions={(options) => options}
              onChange={(event, newValue) => {
                handleFindItem(newValue);
              }}
              renderOption={(props, option) => {
                return (
                  <Box
                    sx={{
                      px: 2,
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor: "#f5f5f5",
                      },
                    }}
                  >
                    <Typography variant="caption">{option}</Typography>
                  </Box>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={debounceSearchProduct}
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      type: "search",
                    },
                  }}
                  sx={{
                    width: "700px",
                    "& .MuiOutlinedInput-root": {
                      color: "white",
                      "& fieldset": {
                        borderColor: "white",
                        color: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                        color: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                        color: "white",
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
