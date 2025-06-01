import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { Alert, TextField } from "@mui/material";
import { PHONE_RULE, PHONE_RULE_MESSAGE } from "../../../utils/constants";
import { useState } from "react";
import { updateAccount } from "../../../api";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
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
export const ModalUpdateAccount = ({
  open,
  setOpenModalUpdate,
  handleGetAllAccount,
  infoAccountToUpdate,
}) => {
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const onSubmit = async (data) => {
    if (changePasswordMode) {
      const { current_password, new_password } = data;
      if (current_password.length === 0 || new_password.length === 0) {
        toast.error("Mật khẩu nên dài từ 8 - 12 kí tự");
      }
      const setData = {
        current_password: data.current_password,
        new_password: data.new_password,
        idUpdate: infoAccountToUpdate._id,
      };
      const res = await updateAccount(setData);
      if (!res.error) {
        toast.success("Thao tác thành công");
        handleClose();
      }
    } else {
      delete data.current_password;
      delete data.new_password;
      const setData = { ...data, idUpdate: infoAccountToUpdate._id };
      const res = await updateAccount(setData);
      if (!res.error) {
        toast.success("Thao tác thành công");
        handleClose();
      }
    }
  };
  const handleClose = () => {
    reset();
    setOpenModalUpdate(!open);
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
            {changePasswordMode ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  width: "100%",
                  mb: 5,
                }}
              >
                <Box sx={{ width: "50%" }}>
                  <TextField
                    fullWidth
                    label="Nhập mật khẩu gần đây..."
                    type="text"
                    variant="outlined"
                    error={!!errors.current_password}
                    {...register("current_password", {
                      required: "Đây là trường bắt buộc.",
                    })}
                    sx={fieldsetCommonStyle}
                  />
                  {errors.current_password && (
                    <Alert
                      severity="error"
                      sx={{
                        mt: "5px",
                        ".MuiAlert-message": { overflow: "hidden" },
                      }}
                    >
                      {errors.current_password.message}
                    </Alert>
                  )}
                </Box>
                <Box sx={{ width: "50%" }}>
                  <TextField
                    autoFocus
                    fullWidth
                    label="Mật khẩu mới..."
                    type="text"
                    variant="outlined"
                    error={!!errors.new_password}
                    {...register("new_password", {
                      required: "Đây là trường bắt buộc.",
                    })}
                    sx={fieldsetCommonStyle}
                  />
                  {errors.new_password && (
                    <Alert
                      severity="error"
                      sx={{
                        mt: "5px",
                        ".MuiAlert-message": { overflow: "hidden" },
                      }}
                    >
                      {errors.new_password.message}
                    </Alert>
                  )}
                </Box>
              </Box>
            ) : (
              //   email & address
              <Box mb={5}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    width: "100%",
                  }}
                >
                  <Box sx={{ width: "50%" }}>
                    <TextField
                      autoFocus
                      fullWidth
                      defaultValue={infoAccountToUpdate?.email}
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
                  <Box sx={{ width: "50%" }}>
                    <TextField
                      autoFocus
                      fullWidth
                      defaultValue={infoAccountToUpdate?.address}
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
                </Box>

                {/* sdt & username */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    width: "100%",
                  }}
                >
                  <Box sx={{ marginTop: "3em", width: "50%" }}>
                    <TextField
                      fullWidth
                      label="Số điện thoại..."
                      defaultValue={infoAccountToUpdate?.phoneNumber}
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

                  <Box sx={{ marginTop: "3em", width: "50%" }}>
                    <TextField
                      fullWidth
                      label="Tên người dùng..."
                      defaultValue={infoAccountToUpdate?.username}
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
                </Box>
              </Box>
            )}
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: (theme) => theme.commonColors,
                color: "white",
                my: 2,
                mr: 3,
              }}
            >
              Xác nhận
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => setChangePasswordMode(!changePasswordMode)}
            >
              Đổi mật khẩu
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
