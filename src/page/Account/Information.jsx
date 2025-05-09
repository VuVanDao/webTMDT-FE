import {
  Avatar,
  Box,
  Button,
  Divider,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Information = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);
  const initialGeneralForm = {
    username: user?.username,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialGeneralForm,
  });
  const submitChangeGeneralInformation = () => {};
  return (
    <Box
      sx={{
        bgcolor: "white",
        boxShadow: "0 0 .8125rem 0 rgba(0, 0, 0, .05)",
        p: "20px 30px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
        <Typography variant="h6">Hồ sơ của tôi</Typography>
        <Typography>Quản lý thông tin hồ sơ để bảo mật tài khoản</Typography>
      </Box>
      <Divider />

      <Box sx={{ display: "flex", gap: 10, mt: 5 }}>
        <form onSubmit={handleSubmit(submitChangeGeneralInformation)}>
          <Box
            sx={{
              width: "400px",
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            <Box>
              <TextField
                disabled
                fullWidth
                label="Your Email"
                type="text"
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {/* <MailIcon fontSize="small" /> */}
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Your UserName"
                defaultValue={user?.username}
                type="text"
                variant="outlined"
                {...register("username", {
                  // required: FIELD_REQUIRED_MESSAGE,
                })}
                error={!!errors["username"]}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: (theme) => theme.commonColors,
                    "& fieldset": {
                      borderColor: (theme) => theme.commonColors,
                      color: (theme) => theme.commonColors,
                    },
                    "&:hover fieldset": {
                      borderColor: (theme) => theme.commonColors,
                      color: (theme) => theme.commonColors,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: (theme) => theme.commonColors,
                      color: (theme) => theme.commonColors,
                    },
                  },
                }}
              />
              {/* <FieldErrorAlert errors={errors} fieldName={"displayName"} /> */}
            </Box>

            <Box>
              <Button
                className="interceptor-loading"
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ bgcolor: (theme) => theme.commonColors }}
              >
                Update
              </Button>
            </Box>
          </Box>
        </form>
        <Divider
          orientation="vertical"
          sx={{ bgcolor: "#f5f5f5", height: "200px" }}
        />

        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ width: 100, height: 100, mb: 1 }}
              alt="TrungQuanDev"
              src={user?.avatar}
            />
            <Tooltip title="Upload a new image to update your avatar immediately.">
              <Button
                component="label"
                variant="contained"
                size="small"
                sx={{ bgcolor: (theme) => theme.commonColors }}
              >
                Upload
                {/* <VisuallyHiddenInput type="file" onChange={uploadAvatar} /> */}
              </Button>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Information;
