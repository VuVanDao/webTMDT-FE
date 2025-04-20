import { Box, Grid, Stack } from "@mui/material";
import React from "react";
import { RecommendData } from "../../../Data/RecommenData";
import { Link } from "react-router-dom";

const Recommend = () => {
  return (
    <Box>
      {/* <Stack direction={"row"} spacing={1}>
       
      </Stack> */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {RecommendData.map((item) => {
            return (
              <Grid
                size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
                key={item.id}
                sx={{ display: "flex" }}
              >
                <Box
                  sx={{
                    border: "1px solid rgba(0, 0, 0, .05)",
                    textAlign: "center",
                    "&:hover": {
                      borderColor: "rgba(0, 0, 0, .12)",
                      boxShadow: "0 0 .8125rem 0 rgba(0, 0, 0, .05)",
                      transform: "translateZ(0)",
                    },
                    overflow: "hidden",
                    p: 1,
                  }}
                  component={Link}
                  to={`/detail?id=${item.id}`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100%" }}
                  />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default Recommend;
