import { Box, Container, Typography } from "@mui/material";
import React from "react";

import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { useForm } from "react-hook-form";

import SigninForm from "./signinForm";
import LoginForm from "./loginForm";

const LoginSigninForm = ({ formState }) => {
  return (
    <Box sx={{ bgcolor: (theme) => theme.bgColor }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box component={Link} to={"/homePage"}>
              <img
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg"
                }
                style={{ width: "120px", cursor: "pointer" }}
              />
            </Box>

            <Typography variant="h5" color="black" sx={{ mt: 0.75 }}>
              {formState === "signin" ? "Đăng kí" : "Đăng nhập"}
            </Typography>
          </Box>
          <Typography color="#fa5130" to="/homePage" component={Link}>
            help?
          </Typography>
        </Box>
      </Container>

      <Box
        sx={{
          background:
            'url("https://down-vn.img.susercontent.com/file/sg-11134004-7reox-m8yiydanxgiv2e")',
          height: "720px",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center center",
          bgcolor: "#d0011b",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "end",
            p: 5,
          }}
        >
          {formState === "signin" ? <SigninForm /> : <LoginForm />}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default LoginSigninForm;
