import { Box, Container } from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import Settings from "./Settings";
import Information from "./Information";
import Footer from "../../components/Footer";

const DetailAccount = () => {
  return (
    <Box
      sx={{
        bgcolor: (theme) => theme.bgColor,
      }}
    >
      <Header showHeader={true} />
      <Container
        sx={{
          display: "flex",
          p: 3,
          gap: 15,
        }}
      >
        <Settings />
        <Information />
      </Container>
      <Footer />
    </Box>
  );
};

export default DetailAccount;
