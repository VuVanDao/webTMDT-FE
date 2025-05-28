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
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserAPI,
  userInfoSelector,
} from "../../redux/slice/userInfoSlice";
import { toast } from "react-toastify";
import CustomInputFile from "../../components/customInputFile/customInputFile";
import { singleFileValidator } from "../../utils/valiodatorFile";
import Lightbox from "yet-another-react-lightbox";

const Information = () => {
  const userInfo = useSelector(userInfoSelector);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const submitChangeGeneralInformation = (data) => {
    // if (data.username === userInfo?.username) {
    //   toast.warning("hãy nhập 1 cái tên mới");
    // } else {
    //   toast
    //     .promise(dispatch(updateUserAPI(data)), {
    //       pending: "updating...",
    //     })
    //     .then((res) => {
    //       if (!res.error) {
    //         toast.success("Update successfully!");
    //       }
    //     });
    // }
    toast
      .promise(dispatch(updateUserAPI(data)), {
        pending: "updating...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Update successfully!");
        }
      });
  };

  const uploadAvatar = (e) => {
    // Lấy file thông qua e.target?.files[0] và validate nó trước khi xử lý
    // console.log("e.target?.files[0]: ", e.target?.files[0]);
    const error = singleFileValidator(e.target?.files[0]);
    if (error) {
      toast.error(error);
      return;
    }

    // Sử dụng FormData để xử lý dữ liệu liên quan tới file khi gọi API
    let reqData = new FormData();
    reqData.append("avatar", e.target?.files[0]);
    // Cách để log được dữ liệu thông qua FormData
    // console.log("reqData: ", reqData);
    // for (const value of reqData.values()) {
    //   console.log("reqData Value: ", value);
    // }

    toast
      .promise(dispatch(updateUserAPI(reqData)), {
        pending: "updating... ",
      })
      .then((res) => {
        console.log(res);
        // Nếu không có lỗi gì thì update lại avatar cho currentUser
        if (!res.error) {
          toast.success("Update successfully!");
        }
        e.target.value = ""; // Reset lại input file
      });
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
                defaultValue={userInfo?.username}
                type="text"
                variant="outlined"
                {...register("username", {
                  // required: FIELD_REQUIRED_MESSAGE,
                })}
                error={!!errors["username"]}
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
              {/* <FieldErrorAlert errors={errors} fieldName={"displayName"} /> */}
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Địa chỉ nhận hàng"
                defaultValue={userInfo?.address}
                type="text"
                variant="outlined"
                {...register("address", {
                  // required: FIELD_REQUIRED_MESSAGE,
                })}
                error={!!errors["address"]}
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
              {/* <FieldErrorAlert errors={errors} fieldName={"address"} /> */}
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Số điện thoại"
                defaultValue={userInfo?.phoneNumber}
                type="text"
                variant="outlined"
                {...register("phoneNumber", {
                  // required: FIELD_REQUIRED_MESSAGE,
                })}
                error={!!errors["phoneNumber"]}
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
            </Box>

            <Box>
              <Button
                className="interceptor-loading"
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ bgcolor: (theme) => theme.commonColors, color: "white" }}
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
              src={userInfo?.avatar}
              onClick={() => setOpen(!open)}
            />

            <Tooltip title="Upload a new image to update your avatar immediately.">
              <Button
                component="label"
                variant="contained"
                size="small"
                sx={{ bgcolor: (theme) => theme.commonColors, color: "white" }}
              >
                Upload
                <CustomInputFile type="file" onChange={uploadAvatar} />
              </Button>
            </Tooltip>
            <Lightbox
              open={open}
              close={() => setOpen(false)}
              slides={[{ src: userInfo?.avatar }]}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Information;
