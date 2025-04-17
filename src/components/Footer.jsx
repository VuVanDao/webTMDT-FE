import { Box } from "@mui/material";
import React from "react";
import { theme } from "../theme";

const Footer = () => {
  return (
    <Box
      sx={{
        height: (theme) => theme.customHeight.Footer,
        bgcolor: "#f5f5f5",
        color: "black",
      }}
    >
      Footer
    </Box>
  );
};

export default Footer;
