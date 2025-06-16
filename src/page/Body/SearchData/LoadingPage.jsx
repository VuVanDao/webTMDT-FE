import React from "react";
import { Box, Container, Grid, Skeleton } from "@mui/material";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const LoadingPage = () => {
  return (
    <Box sx={{ bgcolor: "#f5f5f5" }}>
      <Header showHeader={true} />
      <Container>
        <Box sx={{ p: 3 }}>
          {/* Loading for sort options */}
          <Box
            sx={{
              bgcolor: "#ededed",
              width: "100%",
              p: 2.25,
              display: "flex",
              gap: 2,
              alignItems: "center",
              mb: 2,
            }}
          >
            <Skeleton width={100} height={24} />
            <Skeleton width={80} height={24} />
            <Skeleton width={80} height={24} />
            <Skeleton width={120} height={24} />
          </Box>

          {/* Loading for price filter */}
          <Box
            sx={{
              bgcolor: "#ededed",
              width: "100%",
              p: 2.25,
              display: "flex",
              gap: 2,
              alignItems: "center",
              mb: 2,
            }}
          >
            <Skeleton width={80} height={24} />
            <Box sx={{ display: "flex", gap: 2 }}>
              <Skeleton width={100} height={40} />
              <Skeleton width={100} height={40} />
              <Skeleton width={80} height={40} />
            </Box>
          </Box>

          {/* Loading for product grid */}
          <Box sx={{ flexGrow: 1, p: "15px 0" }}>
            <Grid container spacing={2}>
              {[...Array(12)].map((_, index) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  lg={2}
                  key={index}
                  sx={{ display: "flex" }}
                >
                  <Box
                    sx={{
                      border: "1px solid rgba(0, 0, 0, .05)",
                      textAlign: "center",
                      overflow: "hidden",
                      bgcolor: "white",
                      width: "100%",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={180}
                      animation="wave"
                    />
                    <Box sx={{ p: 1 }}>
                      <Skeleton
                        variant="text"
                        width="90%"
                        height={50}
                        animation="wave"
                        sx={{ mb: 3 }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Skeleton variant="text" width={80} animation="wave" />
                        <Skeleton variant="text" width={60} animation="wave" />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default LoadingPage;
