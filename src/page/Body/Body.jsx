import { Box, Container, Typography } from "@mui/material";
import React from "react";
import Slicker from "../../components/Slicker/Slicker";
import { Link } from "react-router-dom";
import SelectOption from "./SelectOption/SelectOption";
import { Categories } from "../../Data/Categories";
import FlashSale from "./FlashSale/FlashSale";
import Recommend from "./Recommend/Recommend";

const Body = () => {
  return (
    <Box sx={{ bgcolor: "white", color: "black" }}>
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
      <Box sx={{ bgcolor: "#f5f5f5", p: 3 }}>
        <Container>
          <Box sx={{ bgcolor: "white" }}>
            <Box sx={{ p: 2 }}>
              <Typography>DANH MỤC</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
              }}
            >
              {Categories?.map((item) => {
                return (
                  <Box
                    key={item.id}
                    component={Link}
                    to={"/homePage"}
                    sx={{
                      width: "117.6px",
                      height: "135px",
                      border: "1px solid rgba(0, 0, 0, .05)",
                      textAlign: "center",
                      color: "black",
                      "&:hover": {
                        borderColor: "rgba(0, 0, 0, .12)",
                        boxShadow: "0 0 .8125rem 0 rgba(0, 0, 0, .05)",
                        // transform: "translateZ(0)",
                      },
                      overflow: "hidden",
                      p: 1,
                    }}
                  >
                    <img src={item.image} style={{ width: "65%" }} />
                    <Typography>{item.name}</Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Container>
      </Box>
      <Box sx={{ bgcolor: "#f5f5f5", p: 3 }}>
        <Container>
          <Box sx={{ bgcolor: "white" }}>
            <FlashSale />
          </Box>
        </Container>
      </Box>
      <Box sx={{ bgcolor: "#f5f5f5", p: 3 }}>
        <Container>
          <Box sx={{ bgcolor: "white" }}>
            <Recommend />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Body;
