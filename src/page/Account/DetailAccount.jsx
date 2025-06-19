import { Box, Container } from "@mui/material";
import Header from "../../components/Header";
import Settings from "./Settings";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";

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
        <Box sx={{ width: "250px" }}>
          <Settings />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Outlet />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default DetailAccount;
