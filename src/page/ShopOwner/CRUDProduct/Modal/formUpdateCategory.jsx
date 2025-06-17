import { Box, Button, Divider, TextField, Tooltip } from "@mui/material";
import CustomInputFile from "../../../../components/customInputFile/customInputFile";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { toast } from "react-toastify";

const FormUpdateCategory = ({
  open,
  handleUpdateCategoryId,
  categoryIdDataFromModal,
  setUpdateCategoryId,
}) => {
  const [categoryData, setCategoryData] = useState([
    {
      id: uuidv4(),
      name: null,
      image: null,
      imageToDisplay: null,
      price: null,
      quantity: null,
    },
  ]);

  const handleAddNewCategory = () => {
    let categoryDataClone = {
      id: uuidv4(),
      name: null,
      image: null,
      imageToDisplay: null,
      price: null,
      quantity: null,
    };
    setCategoryData([...categoryData, categoryDataClone]);
  };

  const handleDeleteCategory = (id) => {
    const categoryDataClone = [...categoryData];
    const res = categoryDataClone.filter((item) => item.id !== id);
    setCategoryData(res);
  };

  const handleChangeValue = (e, id, key) => {
    const categoryDataClone = [...categoryData];
    const result = categoryDataClone.find((item) => item.id === id);
    result[key] = e;
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
  const validateDataBeforeSend = (data) => {
    let result = true;
    for (let item of data) {
      if (!item.name || !item.image || !item.price || !item.quantity) {
        result = false;
        return result;
      }
    }
    return result;
  };
  const handleConfirm = () => {
    const categoryDataClone = [...categoryData];
    const result = validateDataBeforeSend(categoryDataClone);
    if (!result) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    } else {
      categoryDataClone.map((item) => {
        item.price = +item.price;
        item.quantity = +item.quantity;
      });
    }

    handleUpdateCategoryId(categoryDataClone);
    let categoryDataClear = {
      id: uuidv4(),
      name: null,
      image: null,
      imageToDisplay: null,
      price: null,
      quantity: null,
    };
    setCategoryData([categoryDataClear]);
  };

  useEffect(() => {
    if (categoryIdDataFromModal?.length >= 1) {
      setCategoryData(categoryIdDataFromModal);
    }
  }, [categoryIdDataFromModal]);

  if (!open) {
    return "";
  }

  if (categoryIdDataFromModal?.length >= 1) {
    return (
      <Box>
        {categoryData?.map(
          ({ id, name, image, imageToDisplay, price, quantity }) => {
            return (
              <Box key={id} mb={2}>
                <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                  <Box>
                    <TextField
                      placeholder="Tên loại"
                      defaultValue={name}
                      sx={{
                        "& input": {
                          height: "10px",
                          fontSize: "12px",
                        },
                      }}
                      size="small"
                      onChange={(e) =>
                        handleChangeValue(e.target.value, id, "name")
                      }
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
                      size="small"
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
                      size="small"
                    >
                      Thêm
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteCategory(id)}
                      size="small"
                    >
                      Xoá
                    </Button>
                  </Box>
                </Box>

                <img
                  src={imageToDisplay}
                  style={{
                    width: "50px",
                    marginTop: 2,
                  }}
                />
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    placeholder="Giá"
                    defaultValue={price}
                    size="small"
                    onChange={(e) =>
                      handleChangeValue(e.target.value, id, "price")
                    }
                    sx={{
                      "& input": {
                        height: "10px",
                        fontSize: "12px",
                      },
                    }}
                    type="number"
                  />
                  <TextField
                    placeholder="Số lượng"
                    defaultValue={quantity}
                    size="small"
                    onChange={(e) =>
                      handleChangeValue(e.target.value, id, "quantity")
                    }
                    sx={{
                      "& input": {
                        height: "10px",
                        fontSize: "12px",
                      },
                    }}
                    type="number"
                  />
                </Box>
                <Divider sx={{ mt: 2 }} />
              </Box>
            );
          }
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="contained"
            sx={{ mr: 2, bgcolor: (theme) => theme.commonColors }}
            onClick={handleConfirm}
          >
            Xác nhận
          </Button>
          <Button
            variant="contained"
            sx={{
              mr: 2,
              border: "1px solid #757575",
              bgcolor: "white",
              color: "#757575",
            }}
            onClick={() => setUpdateCategoryId(false)}
          >
            Hủy
          </Button>
        </Box>
      </Box>
    );
  }
  return (
    <Box>
      {categoryData?.map(
        ({ id, name, image, imageToDisplay, price, quantity }) => {
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
                    size="small"
                    onChange={(e) =>
                      handleChangeValue(e.target.value, id, "name")
                    }
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
                    size="small"
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
                    size="small"
                  >
                    Thêm
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteCategory(id)}
                    size="small"
                  >
                    Xoá
                  </Button>
                </Box>
              </Box>

              <img
                src={imageToDisplay}
                style={{
                  width: "100px",
                }}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  placeholder="Giá"
                  defaultValue={price}
                  size="small"
                  onChange={(e) =>
                    handleChangeValue(e.target.value, id, "price")
                  }
                  sx={{
                    "& input": {
                      height: "10px",
                      fontSize: "12px",
                    },
                  }}
                  type="number"
                />
                <TextField
                  placeholder="Số lượng"
                  defaultValue={quantity}
                  size="small"
                  onChange={(e) =>
                    handleChangeValue(e.target.value, id, "quantity")
                  }
                  sx={{
                    "& input": {
                      height: "10px",
                      fontSize: "12px",
                    },
                  }}
                  type="number"
                />
              </Box>
              <Divider sx={{ my: 2 }} />
            </Box>
          );
        }
      )}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="contained"
          sx={{ mr: 2, bgcolor: (theme) => theme.commonColors }}
          onClick={handleConfirm}
        >
          Xác nhận
        </Button>
        <Button
          variant="contained"
          sx={{
            mr: 2,
            border: "1px solid #757575",
            bgcolor: "white",
            color: "#757575",
          }}
          onClick={() => setUpdateCategoryId(false)}
        >
          Hủy
        </Button>
      </Box>
    </Box>
  );
};

export default FormUpdateCategory;
