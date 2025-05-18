import { Box, Button, Container, Typography } from "@mui/material";
import ShopOwnerHeader from "../ShopOwner/ShopOwnerHeader";
import { Outlet } from "react-router-dom";

const RegisterPage = () => {
  return (
    <Box sx={{ bgcolor: (theme) => theme.bgColor, height: "100vh" }}>
      <ShopOwnerHeader myShopHeader={false} />
      <Container
        sx={{
          my: 2,
          bgcolor: "white",
          textAlign: "center",
          py: 5,
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default RegisterPage;
