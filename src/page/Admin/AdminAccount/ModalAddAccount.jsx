import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { Alert, TextField } from "@mui/material";
import CommonButton from "../../../components/CommonButton/CommonButton";
import { PHONE_RULE, PHONE_RULE_MESSAGE } from "../../../utils/constants";
import { createNewAccount } from "../../../api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
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
export const ModalAddAccount = ({ open, setOpen, handleGetAllAccount }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    const res = await createNewAccount(data);
    if (!res.error) {
      handleClose();
    }
  };
  const handleClose = () => {
    reset();
    setOpen(!open);
    handleGetAllAccount();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <TextField
                autoFocus
                fullWidth
                label="Nhập Email..."
                type="text"
                variant="outlined"
                error={!!errors.email}
                {...register("email", {
                  required: "Đây là trường bắt buộc.",
                })}
                sx={fieldsetCommonStyle}
              />
              {errors.email && (
                <Alert
                  severity="error"
                  sx={{
                    mt: "5px",
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
                label="Nhập Password..."
                type="password"
                variant="outlined"
                error={!!errors.password}
                {...register("password", {
                  required: "Đây là trường bắt buộc.",
                })}
                sx={fieldsetCommonStyle}
              />

              {errors.password && (
                <Alert
                  severity="error"
                  sx={{
                    mt: "5px",
                    ".MuiAlert-message": { overflow: "hidden" },
                  }}
                >
                  {errors.password.message}
                </Alert>
              )}
            </Box>
            <Box sx={{ marginTop: "1em" }}>
              <TextField
                fullWidth
                label="Nhập địa chỉ..."
                type="text"
                variant="outlined"
                error={!!errors.address}
                {...register("address", {
                  required: "Đây là trường bắt buộc.",
                })}
                sx={fieldsetCommonStyle}
              />

              {errors.address && (
                <Alert
                  severity="error"
                  sx={{
                    mt: "5px",
                    ".MuiAlert-message": { overflow: "hidden" },
                  }}
                >
                  {errors.address.message}
                </Alert>
              )}
            </Box>
            <Box sx={{ marginTop: "1em" }}>
              <TextField
                fullWidth
                label="Số điện thoại..."
                type="tel"
                variant="outlined"
                error={!!errors.phoneNumber}
                {...register("phoneNumber", {
                  required: "Đây là trường bắt buộc.",
                  pattern: {
                    value: PHONE_RULE,
                    message: PHONE_RULE_MESSAGE,
                  },
                })}
                sx={fieldsetCommonStyle}
              />

              {errors.phoneNumber && (
                <Alert
                  severity="error"
                  sx={{
                    mt: "5px",
                    ".MuiAlert-message": { overflow: "hidden" },
                  }}
                >
                  {errors.phoneNumber.message}
                </Alert>
              )}
            </Box>

            <Box sx={{ marginTop: "1em" }}>
              <TextField
                fullWidth
                label="Tên người dùng..."
                type="text"
                variant="outlined"
                error={!!errors.username}
                {...register("username", {
                  required: "Đây là trường bắt buộc.",
                })}
                sx={fieldsetCommonStyle}
              />

              {errors.username && (
                <Alert
                  severity="error"
                  sx={{
                    mt: "5px",
                    ".MuiAlert-message": { overflow: "hidden" },
                  }}
                >
                  {errors.username.message}
                </Alert>
              )}
            </Box>

            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: (theme) => theme.commonColors,
                color: "white",
                my: 2,
              }}
            >
              Xác nhận
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
