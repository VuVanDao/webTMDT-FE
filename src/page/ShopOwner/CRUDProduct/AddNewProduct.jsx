import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomInputFile from "../../../components/customInputFile/customInputFile";
import { ListCategory } from "../../../components/ListCategory/ListCategory";

const AddNewProduct = () => {
  const [listImage, setListImage] = useState([]);
  const [listImageFileToSend, setListImageFileToSend] = useState([]);
  const [listCategory, setListCategory] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const fieldsetCommonStyle100 = {
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
  const boxStyle = {
    my: 2,
  };
  const handleSetImage = (event) => {
    console.log("e.target?.files[0]: ", event.target?.files[0]);
    const dataImage = [...listImage];
    const dataImageToSend = [...listImageFileToSend];
    dataImage.push(URL.createObjectURL(event.target?.files[0]));
    dataImageToSend.push(event.target?.files[0]);
    setListImage(dataImage);
    setListImageFileToSend(dataImageToSend);
  };
  const handleDeleteImage = (item) => {
    const dataImage = [...listImage];
    setListImage(dataImage.filter((i) => i !== item));
  };
  const handleSelectCategory = (result) => {
    setListCategory(result);
  };
  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", {
      ...data,
      categoryId: [...listCategory],
      image: [...listImageFileToSend],
    });
  };
  return (
    <Container sx={{ my: 3, bgcolor: (theme) => theme.whiteColor, p: 3 }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ border: "2px solid", padding: "10px" }}
      >
        <Box sx={boxStyle}>
          <TextField
            // defaultValue="test"
            fullWidth
            label="Tên sản phẩm"
            error={errors.productName}
            {...register("productName", {
              required: "This field is required.",
            })}
            sx={fieldsetCommonStyle100}
          />
          {errors.productName && (
            <Alert
              severity="error"
              sx={{
                mt: "0.7em",
                ".MuiAlert-message": { overflow: "hidden" },
              }}
            >
              {errors.productName.message}
            </Alert>
          )}
        </Box>

        <Box sx={boxStyle}>
          <TextField
            // defaultValue="test"
            fullWidth
            multiline
            label="Miêu tả sản phẩm "
            rows={4}
            error={errors.productDescription}
            {...register("productDescription", {
              required: "This field is required.",
            })}
            sx={fieldsetCommonStyle100}
          />
          {errors.productDescription && (
            <Alert
              severity="error"
              sx={{
                mt: "0.7em",
                ".MuiAlert-message": { overflow: "hidden" },
              }}
            >
              {errors.productDescription.message}
            </Alert>
          )}
        </Box>

        {/* price */}
        <Box sx={boxStyle}>
          <TextField
            label="Giá cả"
            type="number"
            error={errors.price}
            {...register("price", {
              required: "This field is required.",
            })}
            sx={fieldsetCommonStyle100}
          />
          {errors.price && (
            <Alert
              severity="error"
              sx={{
                mt: "0.7em",
                ".MuiAlert-message": { overflow: "hidden" },
              }}
            >
              {errors.price.message}
            </Alert>
          )}
        </Box>

        {/* quantity */}
        <Box sx={boxStyle}>
          <TextField
            label="Giá cả"
            type="number"
            error={errors.quantity}
            {...register("quantity", {
              required: "This field is required.",
            })}
            sx={fieldsetCommonStyle100}
          />
          {errors.quantity && (
            <Alert
              severity="error"
              sx={{
                mt: "0.7em",
                ".MuiAlert-message": { overflow: "hidden" },
              }}
            >
              {errors.quantity.message}
            </Alert>
          )}
        </Box>

        {/* add image */}
        <Box sx={boxStyle}>
          <Button
            component="label"
            variant="contained"
            sx={{
              bgcolor: (theme) => theme.commonColors,
              cursor: "pointer",
            }}
          >
            Upload
            <CustomInputFile type="file" onChange={handleSetImage} />
          </Button>
          <Grid
            container
            sx={{
              bgcolor: (theme) => theme.bgColor,
              margin: "10px 0",
            }}
            size={{ lg: 2, md: 3, sm: 4, xs: 6 }}
          >
            {listImage.length === 0 ? (
              <Alert
                severity="warning"
                sx={{
                  m: "0.7em",
                  ".MuiAlert-message": { overflow: "hidden" },
                }}
              >
                Vui lòng chọn hình ảnh cho sản phẩm (Tối đa 10 ảnh)
              </Alert>
            ) : (
              listImage?.map((item, index) => (
                <Grid onClick={() => handleDeleteImage(item)} key={index}>
                  <Tooltip title="click to delete">
                    <img
                      src={item}
                      style={{
                        width: "200px",
                        border: "1px solid",
                        margin: "10px",
                      }}
                    />
                  </Tooltip>
                </Grid>
              ))
            )}
          </Grid>
        </Box>

        {/* category */}
        <ListCategory handleSelectCategory={handleSelectCategory} />

        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: (theme) => theme.commonColors,
            cursor: "pointer",
          }}
        >
          confirm
        </Button>
      </form>
    </Container>
  );
};

export default AddNewProduct;
