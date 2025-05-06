import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  Divider,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import React from "react";
import {
  apiRoot,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
} from "../../utils/constants";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authorizeAxiosInstance from "../../utils/authorizeAxios";
import { toast } from "react-toastify";
import { registerUserAPI } from "../../api";
const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const submitLogIn = async (data) => {
    const { email, password } = data;
    toast
      .promise(registerUserAPI({ email, password }), {
        pending: "registering.....",
      })
      .then((user) => {
        navigate(`/login?registeredEmail=${user.email}`);
      });
  };
  const fieldsetCommonStyle = {
    "& label": {
      color: "#ccc",
    },
    "& input": {
      color: "black",
    },
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#ccc",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    ".MuiSvgIcon-root": {
      color: "black",
    },
  };
  const navigate = useNavigate();
  const handleChangeForm = () => {
    navigate("/login");
  };
  return (
    <form onSubmit={handleSubmit(submitLogIn)}>
      <Zoom
        in={true}
        style={{ transitionDelay: "200ms", backgroundColor: "white" }}
      >
        <Card
          sx={{
            minWidth: 380,
            maxWidth: 380,
            p: "0.5em 0",
            borderRadius: 2,
          }}
        >
          <Box sx={{ color: "black", p: "0.5em 1em" }}>
            <Typography variant="h5">Đăng kí</Typography>
          </Box>

          {/* EMAIL */}
          <Box sx={{ padding: "0 1em 1em 1em" }}>
            <Box sx={{ marginTop: "1.2em" }}>
              <TextField
                autoFocus
                fullWidth
                label="Enter Email..."
                type="text"
                variant="outlined"
                error={!!errors.email}
                {...register("email", {
                  required: "This field is required.",
                  pattern: {
                    value: EMAIL_RULE,
                    message: EMAIL_RULE_MESSAGE,
                  },
                })}
                sx={fieldsetCommonStyle}
              />
              {errors.email && (
                <Alert
                  severity="error"
                  sx={{
                    mt: "0.7em",
                    ".MuiAlert-message": { overflow: "hidden" },
                  }}
                >
                  {errors.email.message}
                </Alert>
              )}
            </Box>

            {/* PASSWORD */}
            <Box sx={{ marginTop: "1em" }}>
              <TextField
                fullWidth
                label="Enter Password..."
                type="password"
                variant="outlined"
                error={!!errors.password}
                {...register("password", {
                  required: "This field is required.",
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE,
                  },
                })}
                sx={fieldsetCommonStyle}
              />
              {errors.password && (
                <Alert
                  severity="error"
                  sx={{
                    mt: "0.7em",
                    ".MuiAlert-message": { overflow: "hidden" },
                  }}
                >
                  {errors.password.message}
                </Alert>
              )}
            </Box>

            {/* CONFIRM PASSWORD */}
            <Box sx={{ marginTop: "1em" }}>
              <TextField
                fullWidth
                label="Enter Password Confirmation..."
                type="password"
                variant="outlined"
                error={!!errors["password_confirmation"]}
                {...register("password_confirmation", {
                  validate: (value) => {
                    return value === watch("password")
                      ? true
                      : "confirm password is not match";
                  },
                })}
                sx={fieldsetCommonStyle}
              />
              {errors.password_confirmation && (
                <Alert
                  severity="error"
                  sx={{
                    mt: "0.7em",
                    ".MuiAlert-message": { overflow: "hidden" },
                  }}
                >
                  {errors.password_confirmation.message}
                </Alert>
              )}
            </Box>
          </Box>

          <CardActions
            sx={{
              padding: "0.5em 1em 1em 1em",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                bgcolor: (theme) => theme.commonColors,
                color: "white",
              }}
            >
              sign in
            </Button>
          </CardActions>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              p: "0 1em",
              alignItems: "center",
            }}
          >
            <Divider sx={{ bgcolor: "#ccc", width: "40%", height: "1px" }} />
            <Typography sx={{ color: "#ccc" }}>HOẶC</Typography>
            <Divider sx={{ bgcolor: "#ccc", width: "40%", height: "1px" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              p: "0 1em",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Box
              sx={{
                width: "49%",
                color: "black",
                border: "1px solid black",
                p: 1,
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <FacebookIcon sx={{ color: "blue" }} />
              <Typography>Facebook</Typography>
            </Box>
            <Box
              sx={{
                width: "49%",
                color: "black",
                border: "1px solid black",
                p: 1,
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <GoogleIcon sx={{ color: "#fa5130" }} />
              <Typography>Google</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              color: "#ccc",
              p: "1em",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            Bạn đã có tài khoản?
            <Typography
              sx={{
                color: (theme) => theme.commonColors,
                cursor: "pointer",
              }}
              onClick={handleChangeForm}
            >
              Đăng nhập
            </Typography>
          </Box>
        </Card>
      </Zoom>
    </form>
  );
};

export default SigninForm;
