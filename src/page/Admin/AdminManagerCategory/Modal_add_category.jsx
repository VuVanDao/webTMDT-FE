import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { createNewCategory } from "../../../api";
import { toast } from "react-toastify";
import CustomInputFile from "../../../components/customInputFile/customInputFile";
import axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Modal_add_category = ({ open, handleOpenModal, getCategories }) => {
  const [categoryName, setCategoryName] = useState("");
  const [imageToDisplay, setImageToDisplay] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleCategoryName = (event) => {
    setCategoryName(event.target.value);
  };
  const handleUploadImage = async (e) => {
    setImage(e[0]);
    setImageToDisplay(URL.createObjectURL(e[0]));
    e.target.files = "";
  };
  const createCategory = async () => {
    let data = { name: categoryName };
    if (image) {
      let uploadImage = async () => {
        setLoading(true);
        let formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "ReactUpload");
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dlb4ooi7n/upload",
          formData
        );
        if (res) {
          return res.data.secure_url;
        }
      };
      data.image = await uploadImage();
    }
    await createNewCategory(data)
      .then((res) => {
        if (!res.error) {
          toast.success("Thêm danh mục thành công");
          handleOpenModal();
          setImageToDisplay("");
          getCategories();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Modal
      open={open}
      onClose={handleOpenModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Thêm danh mục
        </Typography>
        <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Tên danh mục..."
            onChange={handleCategoryName}
            disabled={loading}
            size="small"
            sx={{
              mt: 2,
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&:focus-within fieldset": {
                  borderColor: "black !important",
                },
                "&:focus-visible fieldset": {
                  borderColor: "black !important",
                },
                "& fieldset": {
                  borderColor: "black",
                },
              },
            }}
          />
          <Box sx={{ textAlign: "center" }}>
            <img
              src={imageToDisplay}
              style={{
                width: "200px",
                height: "200px",
              }}
            />
            <Button
              component="label"
              variant="contained"
              sx={{
                bgcolor: (theme) => theme.commonColors,
                cursor: "pointer",
              }}
              size="small"
            >
              Chọn ảnh
              <CustomInputFile
                type="file"
                onChange={(e) => handleUploadImage(e.target.files)}
                disabled={loading}
              />
            </Button>
          </Box>
        </Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: (theme) => theme.commonColors,
            mt: 2,
          }}
          onClick={createCategory}
          disabled={loading}
        >
          {loading ? "Đang tải lên..." : "Thêm danh mục"}
        </Button>
      </Box>
    </Modal>
  );
};

export default Modal_add_category;
