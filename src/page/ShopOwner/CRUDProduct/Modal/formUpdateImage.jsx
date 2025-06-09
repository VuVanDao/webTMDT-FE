import { Box, Button, TextField, Tooltip, Typography } from "@mui/material";
import CustomInputFile from "../../../../components/customInputFile/customInputFile";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FormUpdateImage = ({ handleUpdateImage, imageDataFromModal }) => {
  const [imageData, setImageData] = useState([
    {
      id: uuidv4(),
      image: null,
      imageToDisplay: null,
    },
  ]);

  const handleAddNewImage = () => {
    let imageDataClone = {
      id: uuidv4(),
      name: null,
      image: null,
      imageToDisplay: null,
    };
    setImageData([...imageData, imageDataClone]);
  };

  const handleDeleteImage = (id) => {
    const imageDataClone = [...imageData];
    const res = imageDataClone.filter((item) => item.id !== id);
    setImageData(res);
  };

  const handleUploadImage = (e, id) => {
    if (e) {
      const imageDataClone = [...imageData];
      imageDataClone.find((item) => item.id === id).image = e[0];
      imageDataClone.find((item) => item.id === id).imageToDisplay =
        URL.createObjectURL(e[0]);
      setImageData(imageDataClone);
    }
  };

  const handleConfirm = () => {
    const imageDataClone = [...imageData];
    handleUpdateImage(imageDataClone);
    let imageDataClear = {
      id: uuidv4(),
      image: null,
      imageToDisplay: null,
    };
    setImageData([imageDataClear]);
  };

  useEffect(() => {
    if (imageDataFromModal?.length >= 1) {
      imageDataFromModal = imageDataFromModal.map((item) => {
        return {
          id: uuidv4(),
          image: item,
          imageToDisplay: item,
        };
      });
      setImageData(imageDataFromModal);
    }
  }, [imageDataFromModal]);

  if (imageDataFromModal?.length >= 1) {
    return (
      <Box sx={{ width: "1000px", overflow: "auto" }}>
        <Typography variant="h6" mb={3}>
          Ảnh của sản phẩm (Sau khi xác nhận hãy chờ trong vài giây)
        </Typography>
        {imageData?.map(({ id, image, imageToDisplay }) => {
          return (
            <Box key={id} mb={2}>
              <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                <Box>
                  <img
                    src={imageToDisplay}
                    style={{
                      width: "100px",
                      height: "100px",
                      border: "1px solid",
                    }}
                  />
                </Box>
                <Box>
                  <Button
                    component="label"
                    variant="contained"
                    sx={{
                      bgcolor: (theme) => theme.commonColors,
                      cursor: "pointer",
                    }}
                  >
                    Chọn ảnh
                    <CustomInputFile
                      type="file"
                      onChange={(e) => handleUploadImage(e.target.files, id)}
                    />
                  </Button>
                </Box>
                <Box sx={{ ml: 4 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mr: 2 }}
                    onClick={handleAddNewImage}
                  >
                    Thêm
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteImage(id)}
                  >
                    Xoá
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })}
        <Button
          variant="contained"
          sx={{ mr: 2, bgcolor: (theme) => theme.commonColors }}
          onClick={handleConfirm}
        >
          Xác nhận
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "1000px" }}>
      <Typography variant="h5" mb={3}>
        Ảnh của sản phẩm
      </Typography>
      {imageData?.map(({ id, image, imageToDisplay }) => {
        return (
          <Box key={id}>
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              <Box>
                <img
                  src={imageToDisplay}
                  style={{
                    width: "100px",
                    height: "100px",
                    border: "1px solid",
                  }}
                />
              </Box>
              <Box>
                <Button
                  component="label"
                  variant="contained"
                  sx={{
                    bgcolor: (theme) => theme.commonColors,
                    cursor: "pointer",
                  }}
                >
                  Chọn ảnh
                  <CustomInputFile
                    type="file"
                    onChange={(e) => handleUploadImage(e.target.files, id)}
                  />
                </Button>
              </Box>
              <Box sx={{ ml: 4 }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 2 }}
                  onClick={handleAddNewImage}
                >
                  Thêm
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteImage(id)}
                >
                  Xoá
                </Button>
              </Box>
            </Box>
          </Box>
        );
      })}
      <Button
        variant="contained"
        sx={{ mr: 2, bgcolor: (theme) => theme.commonColors }}
        onClick={handleConfirm}
      >
        Xác nhận
      </Button>
    </Box>
  );
};

export default FormUpdateImage;
