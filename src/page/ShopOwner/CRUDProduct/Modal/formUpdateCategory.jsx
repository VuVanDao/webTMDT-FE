import { Box, Button, TextField, Tooltip } from "@mui/material";
import CustomInputFile from "../../../../components/customInputFile/customInputFile";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FormUpdateCategory = ({ open, handleUpdateCategoryId }) => {
  const [categoryData, setCategoryData] = useState([
    {
      id: uuidv4(),
      name: null,
      image: null,
      imageToDisplay: null,
    },
  ]);
  const handleAddNewCategory = () => {
    let categoryDataClone = {
      id: uuidv4(),
      name: null,
      image: null,
      imageToDisplay: null,
    };
    setCategoryData([...categoryData, categoryDataClone]);
  };

  const handleDeleteCategory = (id) => {
    const categoryDataClone = [...categoryData];
    const res = categoryDataClone.filter((item) => item.id !== id);
    setCategoryData(res);
  };

  const handleChangeValue = (e, id) => {
    const categoryDataClone = [...categoryData];
    const result = categoryDataClone.find((item) => item.id === id);
    result.name = e;
  };

  const handleUploadImage = (e, id) => {
    if (e) {
      const categoryDataClone = [...categoryData];
      categoryDataClone.find((item) => item.id === id).image = e[0];
      categoryDataClone.find((item) => item.id === id).imageToDisplay =
        URL.createObjectURL(e[0]);
      setCategoryData(categoryDataClone);
    }
  };
  const handleDeleteImage = (id) => {
    const categoryDataClone = [...categoryData];
    categoryDataClone.find((item) => item.id === id).image = null;
    categoryDataClone.find((item) => item.id === id).imageToDisplay = null;
    setCategoryData(categoryDataClone);
  };
  const handleConfirm = () => {
    const categoryDataClone = [...categoryData];
    handleUpdateCategoryId(categoryDataClone);
    let categoryDataClear = {
      id: uuidv4(),
      name: null,
      image: null,
      imageToDisplay: null,
    };
    setCategoryData([categoryDataClear]);
  };

  useEffect(() => {}, []);
  if (!open) {
    return "";
  }
  return (
    <Box>
      {categoryData?.map(({ id, name, image, imageToDisplay }) => {
        return (
          <Box key={id}>
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              <Box>
                <TextField
                  placeholder="Tên loại"
                  sx={{
                    "& input": {
                      height: "10px",
                    },
                  }}
                  onChange={(e) => handleChangeValue(e.target.value, id)}
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
                  onClick={handleAddNewCategory}
                >
                  Thêm
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteCategory(id)}
                >
                  Xoá
                </Button>
              </Box>
            </Box>
            <Tooltip
              title="click to delete"
              onClick={() => handleDeleteImage(id)}
            >
              <img
                src={imageToDisplay}
                style={{
                  width: "100px",
                  //   border: "1px solid",
                }}
              />
            </Tooltip>
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

export default FormUpdateCategory;
