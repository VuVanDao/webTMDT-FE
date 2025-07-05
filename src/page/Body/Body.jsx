import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slicker from "../../components/Slicker/Slicker";
import { Link } from "react-router-dom";
import SelectOption from "./SelectOption/SelectOption";

import FlashSale from "./FlashSale/FlashSale";
import Recommend from "./Recommend/Recommend";
import TopSearch from "./TopSearch/TopSearch";

import Tags from "./Tags/Tags";

const Body = () => {
  return (
    <Box
      sx={{
        bgcolor: "white",
        color: "black",
        minWidth: {
          sm: "1300px !important",
        },
      }}
    >
      {/* Slicker */}
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box>
          <Slicker />
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "space-evenly",
              mt: 1,
            }}
          >
            <Box component={Link} to="/">
              <img
                src="https://cf.shopee.vn/file/vn-11134258-7ra0g-m8n2fwn4mhri79_xhdpi"
                style={{ width: "100%" }}
              />
            </Box>
            <Box component={Link} to="/">
              <img
                src="https://cf.shopee.vn/file/vn-11134258-7ra0g-m8n2h961kosnc8_xhdpi"
                style={{ width: "100%" }}
              />
            </Box>
          </Box>
          <Box>
            <SelectOption />
          </Box>
        </Box>
      </Container>

      {/* danh muc */}
      <Tags />

      {/* flashSale */}
      <Box sx={{ bgcolor: "#f5f5f5", p: 3 }}>
        <Container>
          <Box sx={{ bgcolor: "white" }}>
            <FlashSale />
          </Box>
        </Container>
      </Box>

      {/* recommend */}
      <Box sx={{ bgcolor: "#f5f5f5", p: 3 }}>
        <Container>
          <Box>
            <Recommend />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Body;
