import React, { useState } from "react";
import { Box, Container, TextField, Autocomplete, Button } from "@mui/material";
import shopeeImg from "../../assets/shopee.png";
import CartItem from "../Cart/CartItem";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { fetchProductAPI } from "../../api";
import { useDebounceFn } from "../../customHook/useDebounceFn";
import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";

const Header = ({ showHeader }) => {
  const navigate = useNavigate();
  const [resultSearch, setResultSearch] = useState([]);
  const [searchType, setSearchType] = useState("");

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
    navigate(`/search?value=${value}`);
  };
  const handleSearchItem = () => {
    if (!searchType) return;
    navigate(`/search?value=${searchType}`);
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
        <Container minWidth="100vw !important">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 1,
            }}
          >
            {/* left */}
            <LeftHeader />

            {/* right */}
            <RightHeader />
          </Box>
        </Container>
      </Box>
    );
  return (
    <Box
      sx={{
        height: (theme) => theme.customHeight.Header,
        minWidth: "600px !important",
        bgcolor: (theme) => theme.commonColors,
        color: "white",
        p: 0.25,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Container maxWidth="xl">
        {/* top header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 1,
          }}
        >
          {/* left */}
          <LeftHeader />

          {/* right */}
          <RightHeader />
        </Box>

        {/* bottom header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 1,
            alignItems: "center",
          }}
        >
          {/* logo */}
          <Box component={Link} to="/homePage">
            <img
              src={shopeeImg}
              style={{ width: "150px", cursor: "pointer" }}
            />
          </Box>

          {/* search */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button sx={{ color: "white" }} onClick={handleSearchItem}>
              <SearchIcon sx={{ cursor: "pointer" }} />
            </Button>

            <Autocomplete
              size="small"
              sx={{
                width: {
                  mdd: "550px !important",
                  sm: "300px !important",
                  xs: "200px",
                },
              }}
              options={
                resultSearch.map((product) => {
                  return product?.name;
                }) || []
              }
              filterOptions={(options) => options}
              onChange={(event, newValue) => {
                handleFindItem(newValue);
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
                  fullWidth
                  sx={{
                    // width: {
                    //   mdd: "600px !important",
                    //   sm: "300px !important",
                    // },
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

          {/* cart */}
          <Box>
            <CartItem />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
