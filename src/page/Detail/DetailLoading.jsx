import { Box, Container, Skeleton, Grid } from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const DetailLoading = () => {
  return (
    <Box>
      <Header showHeader={true} />
      <Box
        sx={{
          bgcolor: "#f5f5f5",
          py: 3,
        }}
      >
        <Container sx={{ minWidth: "1200px !important" }}>
          <Box sx={{ bgcolor: "white", color: "black", p: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
              }}
            >
              {/* Right side - Image section */}
              <Box
                sx={{
                  width: "500px",
                  height: "500px",
                  textAlign: "center",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width={350}
                  height={350}
                  sx={{ mx: "auto" }}
                />
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={1}>
                    {[1, 2, 3, 4].map((item) => (
                      <Grid item key={item}>
                        <Skeleton
                          variant="rectangular"
                          width={80}
                          height={80}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>

              {/* Left side - Product details */}
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" height={40} />
                <Skeleton
                  variant="text"
                  width="30%"
                  height={30}
                  sx={{ mt: 1 }}
                />

                {/* Price */}
                <Box sx={{ p: 2, bgcolor: "#f5f5f5", mt: 2 }}>
                  <Skeleton variant="text" width="40%" height={40} />
                </Box>

                {/* Shipping */}
                <Box sx={{ mt: 3 }}>
                  <Skeleton variant="text" width="100%" height={30} />
                  <Skeleton variant="text" width="70%" height={30} />
                </Box>

                {/* Category */}
                <Box sx={{ mt: 3 }}>
                  <Skeleton variant="text" width="20%" height={30} />
                  <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                    {[1, 2, 3].map((item) => (
                      <Skeleton
                        key={item}
                        variant="rectangular"
                        width={100}
                        height={40}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Size */}
                <Box sx={{ mt: 3 }}>
                  <Skeleton variant="text" width="20%" height={30} />
                  <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                    {[1, 2, 3].map((item) => (
                      <Skeleton
                        key={item}
                        variant="rectangular"
                        width={80}
                        height={40}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Quantity */}
                <Box sx={{ mt: 3 }}>
                  <Skeleton variant="text" width="20%" height={30} />
                  <Skeleton
                    variant="rectangular"
                    width={150}
                    height={40}
                    sx={{ mt: 1 }}
                  />
                </Box>

                {/* Buttons */}
                <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                  <Skeleton variant="rectangular" width={200} height={50} />
                  <Skeleton variant="rectangular" width={200} height={50} />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Shop Info */}
          <Box sx={{ bgcolor: "white", color: "black", p: 3, mt: 2 }}>
            <Skeleton variant="text" width="30%" height={40} />
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Skeleton variant="circular" width={60} height={60} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="40%" height={30} />
                <Skeleton variant="text" width="60%" height={30} />
              </Box>
            </Box>
          </Box>

          {/* Product Description */}
          <Box sx={{ bgcolor: "white", color: "black", p: 3, mt: 2 }}>
            <Skeleton variant="text" width="30%" height={40} />
            <Box sx={{ mt: 2 }}>
              <Skeleton variant="text" width="100%" height={20} />
              <Skeleton variant="text" width="90%" height={20} />
              <Skeleton variant="text" width="95%" height={20} />
              <Skeleton variant="text" width="85%" height={20} />
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default DetailLoading;
