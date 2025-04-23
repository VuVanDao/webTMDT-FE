import { Box, Container, Link, Typography } from "@mui/material";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const TopSearch = () => {
  return (
    <Box sx={{ bgcolor: "#f5f5f5", p: 3 }}>
      <Container>
        <Box sx={{ bgcolor: "white" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: (theme) => theme.commonColors,
              textDecoration: "none",
              justifyContent: "space-between",
              p: 1,
            }}
          >
            <Typography>TÌM KIẾM HÀNG ĐẦU</Typography>
            <Link
              href="#"
              sx={{
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                color: (theme) => theme.commonColors,
                textDecoration: "none",
              }}
            >
              Xem tất cả <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />
            </Link>
          </Box>
          <Box></Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TopSearch;
