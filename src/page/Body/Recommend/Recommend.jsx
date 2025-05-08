import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { RecommendData } from "../../../Data/RecommenData";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/formatter";

const Recommend = () => {
  // useEffect(() => {
  //   RecommendData.sort((a, b) => a.sold - b.sold);
  // });
  return (
    <Box>
      {/* <Stack direction={"row"} spacing={1}>
       
      </Stack> */}
      <Box
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Box
          sx={{
            textAlign: "center",
            p: 3,
            borderBottom: "5px solid",
            borderBottomColor: (theme) => theme.commonColors,
            bgcolor: "white",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: (theme) => theme.commonColors }}
          >
            Gợi ý hôm nay
          </Typography>
        </Box>
        <Grid container spacing={2} sx={{ bgcolor: (theme) => theme.bgColor }}>
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
                      borderColor: (theme) => theme.commonColors,
                      boxShadow: "0 0 .8125rem 0 rgba(0, 0, 0, .05)",
                      transform: "scale(1)",
                    },
                    overflow: "hidden",
                    // p: 1,
                    bgcolor: "white",
                  }}
                  component={Link}
                  to={`/detail?id=${item.id}`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100%", border: "1px solid black" }}
                  />
                  <Box sx={{ p: 1 }}>
                    <Box
                      sx={{
                        height: "50px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: "black",
                        mb: 3,
                      }}
                    >
                      <Typography>{item?.name}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "black",
                        alignItems: "center",
                      }}
                    >
                      <Typography>{formatPrice(item?.price)}</Typography>
                      <Typography sx={{ fontSize: "14px" }}>
                        Đã bán: {item?.sold}
                      </Typography>
                    </Box>
                  </Box>
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
