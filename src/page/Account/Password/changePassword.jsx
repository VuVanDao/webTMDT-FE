import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { updateUserAPI } from "../../../redux/slice/userInfoSlice";

const ChangePassword = () => {
  useEffect(() => {}, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const submitChangeGeneralInformation = (data) => {
    toast
      .promise(dispatch(updateUserAPI(data)), {
        pending: "updating...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Cập nhật mật khẩu thành công!");
        } else {
          toast.error("Vui lòng kiểm tra lại mật khẩu hiện tại");
        }
      })
      .catch((err) => {});
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        boxShadow: "0 0 .8125rem 0 rgba(0, 0, 0, .05)",
        p: "20px 30px",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", mb: 1, color: "black" }}
      >
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
                fullWidth
                label="Mật khẩu hiện tại"
                type="password"
                variant="outlined"
                {...register("currentPassword", {
                  required: "Vui lòng nhập mật khẩu hiện tại",
                })}
                error={!!errors["currentPassword"]}
                sx={{
                  "& label.Mui-focused": {
                    color: (theme) => theme.commonColors,
                  },
                  "& label": {
                    color: (theme) => theme.commonColors,
                  },
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
              {errors.currentPassword && (
                <Alert
                  severity="error"
                  sx={{
                    mt: "0.7em",
                    ".MuiAlert-message": { overflow: "hidden" },
                  }}
                >
                  {errors.currentPassword.message}
                </Alert>
              )}
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Mật khẩu mới"
                type="password"
                variant="outlined"
                {...register("newPassword", {
                  required: "Vui lòng nhập mật khẩu mới",
                })}
                error={!!errors["newPassword"]}
                sx={{
                  "& label.Mui-focused": {
                    color: (theme) => theme.commonColors,
                  },
                  "& label": {
                    color: (theme) => theme.commonColors,
                  },
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
              {errors.newPassword && (
                <Alert
                  severity="error"
                  sx={{
                    mt: "0.7em",
                    ".MuiAlert-message": { overflow: "hidden" },
                  }}
                >
                  {errors.newPassword.message}
                </Alert>
              )}
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Nhập lại mật khẩu mới"
                type="password"
                variant="outlined"
                {...register("confirmPassword", {
                  required: "Vui lòng nhập lại mật khẩu mới",
                  validate: (value) =>
                    value === watch("newPassword") || "Mật khẩu không khớp",
                })}
                error={!!errors["confirmPassword"]}
                sx={{
                  "& label.Mui-focused": {
                    color: (theme) => theme.commonColors,
                  },
                  "& label": {
                    color: (theme) => theme.commonColors,
                  },
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
              {errors.confirmPassword && (
                <Alert
                  severity="error"
                  sx={{
                    mt: "0.7em",
                    ".MuiAlert-message": { overflow: "hidden" },
                  }}
                >
                  {errors.confirmPassword.message}
                </Alert>
              )}
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ bgcolor: (theme) => theme.commonColors, color: "white" }}
            >
              Xác nhận
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ChangePassword;
