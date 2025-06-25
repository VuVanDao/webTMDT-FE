import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { Alert, TextField } from "@mui/material";
import { createNewBrand } from "../../../api/brandAPI/brandAPI";
import CustomInputFile from "../../../components/customInputFile/customInputFile";
import { useState } from "react";
import { singleFileValidator } from "../../../utils/valiodatorFile";
import { toast } from "react-toastify";
import axios from "axios";

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
export const ModalAddBrands = ({ open, setOpen, handleGetAllBrand }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [imageToView, setImageToView] = useState(null);
  const [imageToUpload, setImageToUpload] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadImage = async () => {
    setLoading(true);
    let reqData = new FormData();
    reqData.append("file", imageToUpload);
    reqData.append("upload_preset", "ReactUpload");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dlb4ooi7n/upload",
      reqData
    );
    if (res) {
      return res.data.secure_url;
    }
    return null;
  };
  const onSubmit = async (data) => {
    const imageURL = await uploadImage();

    if (imageURL) {
      toast
        .promise(createNewBrand({ ...data, brandImage: imageURL }), {
          pending: "uploading.....",
        })
        .then((res) => {
          if (!res.error) {
            toast.success("đã xong");
            handleClose();
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.error("Có lỗi xảy ra....");
    }
  };
  const setImage = async (e) => {
    const error = singleFileValidator(e.target?.files[0]);
    if (error) {
      toast.error(error);
      return;
    }
    setImageToView(URL.createObjectURL(e.target.files[0]));
    setImageToUpload(e.target.files[0]);
    return;
  };
  const handleClose = () => {
    reset();
    setOpen(!open);
    handleGetAllBrand();
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box>
              <TextField
                autoFocus
                fullWidth
                disabled={loading}
                label="Tên thương hiệu"
                type="text"
                variant="outlined"
                error={!!errors.brandName}
                {...register("brandName", {
                  required: "Đây là trường bắt buộc.",
                })}
                sx={fieldsetCommonStyle}
              />
              {errors.brandName && (
                <Alert
                  severity="error"
                  sx={{
                    mt: "5px",
                    ".MuiAlert-message": { overflow: "hidden" },
                  }}
                >
                  {errors.brandName.message}
                </Alert>
              )}
            </Box>

            <Box
              sx={{ textAlign: "center" }}
              component={"label"}
              title="click to upload"
            >
              <img
                src={imageToView}
                style={{
                  cursor: "pointer",
                  width: "250px",
                  height: "150px",
                  borderRadius: "10px",
                  marginTop: "10px",
                }}
              />
              <CustomInputFile type="file" onChange={setImage} />
            </Box>

            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: (theme) => theme.commonColors,
                color: "white",
                my: 2,
              }}
              loading={loading}
            >
              Xác nhận
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
