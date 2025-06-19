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
import { Link, useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { useForm } from "react-hook-form";
// import { loginUserAPI } from "../../api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUserAPI } from "../../redux/slice/userInfoSlice";
const LoginForm = () => {
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const dispatch = useDispatch();
  const submitLogIn = async (data) => {
    const { email, password } = data;

    toast
      .promise(dispatch(loginUserAPI({ email, password })), {
        pending: "currently logged in.....",
      })
      .then((user) => {
        if (!user.error) {
          navigate(`/homePage`);
        } else {
          toast.error("Vui lòng kiểm tra lại email và mật khẩu");
        }
      })
      .catch((error) => {
        console.log(error);
        navigate(`/login`);
      });
  };
  const navigate = useNavigate();
  const handleChangeForm = () => {
    navigate("/signin");
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
            <Typography variant="h5">Đăng nhập</Typography>
          </Box>

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

            <Box sx={{ marginTop: "1em" }}>
              <TextField
                fullWidth
                label="Enter Password..."
                type="password"
                variant="outlined"
                error={!!errors.password}
                {...register("password", {
                  required: "This field is required.",
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
              Login
            </Button>
          </CardActions>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              p: "0 1em",
            }}
          >
            <Typography
              component={Link}
              sx={{ fontSize: "12px", color: "#05a" }}
            >
              Quên mật khẩu
            </Typography>
            <Typography
              component={Link}
              sx={{ fontSize: "12px", color: "#05a" }}
            >
              Đăng nhập với sms
            </Typography>
          </Box>
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
            Bạn mới biết đến Shopee?
            <Typography
              sx={{
                color: (theme) => theme.commonColors,
                cursor: "pointer",
              }}
              onClick={handleChangeForm}
            >
              Đăng kí
            </Typography>
          </Box>
        </Card>
      </Zoom>
    </form>
  );
};

export default LoginForm;
