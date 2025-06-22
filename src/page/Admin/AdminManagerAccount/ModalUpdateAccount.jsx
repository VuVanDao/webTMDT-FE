import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { Alert, Select, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {
  PHONE_RULE,
  PHONE_RULE_MESSAGE,
  USER_ROLES,
} from "../../../utils/constants";
import { useState } from "react";
import { updateAccount } from "../../../api";
import { toast } from "react-toastify";
import { Lightbox } from "yet-another-react-lightbox";
import CustomInputFile from "../../../components/customInputFile/customInputFile";
import { singleFileValidator } from "../../../utils/valiodatorFile";
import axios from "axios";
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
  const [changeCommonInfoMode, setChangeCommonInfoMode] = useState(true);
  const [changeImageMode, setChangeImageMode] = useState(false);
  const [changeRoleMode, setChangeRoleMode] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [role, setRole] = useState(infoAccountToUpdate?.role);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const onSubmit = async (data) => {
    if (changeRoleMode) {
      if (role !== infoAccountToUpdate?.role && role) {
        const res = await updateAccount({
          role: role,
          idUpdate: infoAccountToUpdate._id,
        });
        if (!res.error) {
          toast.success("Thao tác thành công");
          handleClose();
          return;
        }
      } else {
        toast.error("Vui lòng chọn quyền");
        return;
      }
    }

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
  const uploadAvatar = async (e) => {
    // console.log("e.target?.files[0]: ", e.target?.files[0]);
    const error = singleFileValidator(e.target?.files[0]);
    if (error) {
      toast.error(error);
      return;
    }
    // Sử dụng FormData để xử lý dữ liệu liên quan tới file khi gọi API
    let reqData = new FormData();
    reqData.append("file", e.target?.files[0]);
    reqData.append("upload_preset", "ReactUpload");
    toast
      .promise(
        axios.post("https://api.cloudinary.com/v1_1/dlb4ooi7n/upload", reqData),
        {
          pending: "updating....",
        }
      )
      .then(async (res) => {
        const result = await updateAccount({
          avatar: res.data.secure_url,
          idUpdate: infoAccountToUpdate._id,
        });
        if (!result.error) {
          toast.success("Thao tác thành công");
          handleClose();
        }
      });

    // Reset lại input file
    e.target.value = "";
  };

  const handleClose = () => {
    reset();
    setRole(null);
    setChangeCommonInfoMode(true);
    setChangePasswordMode(false);
    setChangeImageMode(false);
    setChangeRoleMode(false);
    setOpenModalUpdate(!open);
    handleGetAllAccount();
  };
  const handleChange = (id) => {
    switch (id) {
      case "password":
        setChangePasswordMode(true);
        setChangeCommonInfoMode(false);
        setChangeImageMode(false);
        setChangeRoleMode(false);
        break;
      case "commonInfo":
        setChangePasswordMode(false);
        setChangeCommonInfoMode(true);
        setChangeImageMode(false);
        setChangeRoleMode(false);
        break;
      case "avatar":
        setChangePasswordMode(false);
        setChangeCommonInfoMode(false);
        setChangeImageMode(true);
        setChangeRoleMode(false);
        break;
      case "role":
        setChangePasswordMode(false);
        setChangeCommonInfoMode(false);
        setChangeImageMode(false);
        setChangeRoleMode(true);
        break;
      default:
        break;
    }
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
            {changePasswordMode && (
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
            )}
            {changeCommonInfoMode && ( //   email & address
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
            {changeImageMode && (
              <Box sx={{ textAlign: "center" }}>
                <img
                  src={infoAccountToUpdate?.avatar}
                  onClick={() => setOpenImage(!openImage)}
                  style={{
                    cursor: "pointer",
                    width: "250px",
                    height: "250px",
                    borderRadius: "10px",
                  }}
                />
                <Button
                  component="label"
                  variant="contained"
                  size="small"
                  sx={{
                    bgcolor: (theme) => theme.commonColors,
                    color: "white",
                  }}
                >
                  Upload
                  <CustomInputFile type="file" onChange={uploadAvatar} />
                </Button>
              </Box>
            )}
            {changeRoleMode && (
              <Box>
                <Select
                  // defaultValue={USER_ROLES.CUSTOMER}
                  onChange={(e) => setRole(e.target.value)}
                >
                  {Object.values(USER_ROLES).map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
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
              onClick={() => handleChange("commonInfo")}
              sx={{
                mr: 3,
              }}
            >
              Đổi thông tin cá nhân
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => handleChange("password")}
              sx={{
                mr: 3,
              }}
            >
              Đổi mật khẩu
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => handleChange("avatar")}
              sx={{
                mr: 3,
              }}
            >
              Đổi ảnh cá nhân
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => handleChange("role")}
              sx={{
                mr: 3,
              }}
            >
              Đổi quyền
            </Button>
          </form>
        </Box>
      </Modal>
      <Lightbox
        open={openImage}
        close={() => setOpenImage(false)}
        slides={[{ src: infoAccountToUpdate?.avatar }]}
      />
    </div>
  );
};
