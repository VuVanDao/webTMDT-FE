import { Box, Container } from "@mui/material";
import React from "react";
import { theme } from "../theme";

const Footer = () => {
  return (
    <Box
      sx={{
        height: (theme) => theme.customHeight.Footer,
        bgcolor: "white",
        color: "black",
      }}
    >
      <Container> Footer</Container>
    </Box>
  );
};

export default Footer;
