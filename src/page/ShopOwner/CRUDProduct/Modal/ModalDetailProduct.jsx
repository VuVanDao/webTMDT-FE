import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { formatPrice } from "../../../../utils/formatter";
import { Grid, TextField, Tooltip } from "@mui/material";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ToggleFocusInput from "../../../../components/customInputFile/ToggleFocusInput";

import { deleteProduct, getProductById, update } from "../../../../api";
import { ListTags } from "../../../../components/ListTags/ListTags";
import { SizesList } from "../../../../components/SizeList/SizeList";
import FormUpdateCategory from "./formUpdateCategory";
import axios from "axios";
import CommonButton from "../../../../components/CommonStyleButton/CommonButton";
import FormUpdateImage from "./formUpdateImage";

import MDEditor from "@uiw/react-md-editor";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  width: "1100px",
  overflowY: "scroll",
  height: "80vh",
};

export const ModalDetailProduct = ({
  handleOpenModalDetail,
  open,
  detailProductId,
  handleGetAllProduct,
}) => {
  const [detailProduct, setDetailProduct] = useState({});

  const [imageProduct, setImageProduct] = useState(null);
  const [listTags, setListTags] = useState([]);
  const [listSizes, setListSizes] = useState([]);
  const [valueDescription, setValueDescription] = useState(""); //gia tri description

  const [updateProductName, setUpdateProductName] = useState(false);
  const [updatePrice, setUpdatePrice] = useState(false);
  const [updateTags, setUpdateTags] = useState(false);
  const [updateCategoryId, setUpdateCategoryId] = useState(false);
  const [updateQuantity, setUpdateQuantity] = useState(false);
  const [updateImage, setUpdateImage] = useState(false);
  const [updateDescription, setUpdateDescription] = useState(false); // chuyen sang xem,chinh sua description
  const [DescriptionMode, setDescriptionMode] = useState(false); //dung de chuyen che do view - edit cua edit description

  const [openSizeList, setOpenSizeList] = useState(false);

  const handleClose = () => {
    setImageProduct(null);
    setUpdateProductName(false);
    setUpdatePrice(false);
    setUpdateTags(false);
    setOpenSizeList(false);
    handleOpenModalDetail();
  };

  const handleSetImageProduct = (i) => {
    setImageProduct(i);
  };

  const handleSelectSize = (result) => {
    setListSizes(result);
  };

  const handleSetSize = (data) => {
    const listSize = [...data];
    let result = listSize.some(
      (item) => item.includes("Thời trang") || item.includes("Quần áo")
    );
    setOpenSizeList(result);
  };

  const handleSelectTags = (result) => {
    setListTags((preState) => {
      handleSetSize(result);
      return result;
    });
  };

  const handleUpdate = (newName, key) => {
    let data = {};
    if (key === "tagsId" || key === "size" || key === "tagsId&Size") {
      switch (key) {
        case "tagsId":
          data = { [key]: listTags, size: [] };
          break;
        case "size":
          data = { [key]: listSizes };
          break;
        case "tagsId&Size":
          data = { tagsId: listTags, size: listSizes };
          break;
        default:
          break;
      }
    } else {
      data = { [key]: newName };
    }
    updateDataProduct(data);
  };

  const handleUpdateCategoryId = async (categoryData) => {
    const uploadPromises = categoryData.map(async (item) => {
      let formData = new FormData();
      formData.append("file", item?.image);
      formData.append("upload_preset", "ReactUpload");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dlb4ooi7n/upload",
        formData
      );
      if (res) {
        item.image = res.data.secure_url;
        item.imageToDisplay = res.data.secure_url;
      }
      return item;
    });
    const updatedItems = await Promise.all(uploadPromises);

    let data = { categoryId: updatedItems };
    updateDataProduct(data);
  };

  const handleGetProductById = async (id) => {
    const res = await getProductById(id);
    if (!res.error) {
      let totalQuantity = 0;
      res?.categoryId.map((item) => {
        totalQuantity += item.quantity;
      });
      setDetailProduct({
        ...res,
        quantity: totalQuantity,
      });
      setValueDescription(res?.description);
    }
  };

  const handleUpdateImage = async (imageDataClone) => {
    const uploadPromises = imageDataClone.map(async (item) => {
      let formData = new FormData();
      formData.append("file", item?.image);
      formData.append("upload_preset", "ReactUpload");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dlb4ooi7n/upload",
        formData
      );
      if (res) {
        return res.data.secure_url;
      }
    });
    const updatedItems = await Promise.all(uploadPromises);

    let data = { image: updatedItems };
    updateDataProduct(data);
  };

  const updateDataProduct = (data) => {
    const id = detailProduct?._id;
    toast
      .promise(update({ ...data, id }), {
        pending: "Đang cập nhật chỉnh sửa",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Cập nhật thành công");
          handleGetAllProduct();
        }
      });
  };

  const handleDeleteProduct = async (id) => {
    const res = await deleteProduct(id);
    if (!res.error) {
      toast.success("Xóa sản phẩm thành công");
      handleGetAllProduct();
      handleClose();
    }
  };

  useEffect(() => {
    if (detailProductId) handleGetProductById(detailProductId);
  }, [handleGetAllProduct]);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflowY: "scroll" }}
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
            }}
          >
            {/* left */}
            <Box
              sx={{
                width: "500px",
                height: "500px",
                textAlign: "center",
              }}
            >
              {!imageProduct ? (
                <img
                  src={
                    detailProduct?.image?.length >= 1
                      ? detailProduct?.image[0]
                      : null
                  }
                  alt={detailProduct?.name}
                  style={{
                    width: "100%",
                    height: "320px",
                    border: "1px solid",
                  }}
                />
              ) : (
                <img
                  src={imageProduct}
                  alt={detailProduct?.name}
                  style={{
                    width: "100%",
                    height: "320px",
                    border: "1px solid",
                  }}
                />
              )}

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: 1,
                  "& .swiper": {
                    width: "300px",
                    height: "100px",
                  },
                  "& .swiper .swiper-button-prev": {
                    color: (theme) => theme.commonColors,
                  },
                  "& .swiper .swiper-button-next": {
                    color: (theme) => theme.commonColors,
                  },
                  "& .swiper-slide": {
                    textAlign: "center",
                    fontSize: "18px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                }}
              >
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  slidesPerView={1}
                  spaceBetween={30}
                >
                  {detailProduct?.image?.map((i, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <Grid>
                          <img
                            src={i}
                            alt={i}
                            style={{ width: "80px", border: "1px solid" }}
                            onClick={() => handleSetImageProduct(i)}
                          />
                        </Grid>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </Box>

              <Box onClick={() => setUpdateImage(!updateImage)}>
                {updateImage ? (
                  <CommonButton value={"Trở về"} />
                ) : (
                  <CommonButton value={"Thay ảnh"} />
                )}
              </Box>

              <Button
                variant="contained"
                sx={{ bgcolor: (theme) => theme.commonColors, mt: 2 }}
                onClick={() => handleDeleteProduct(detailProduct?._id)}
              >
                Loại bỏ sản phẩm
              </Button>
            </Box>

            {/* right */}

            {updateImage ? (
              <FormUpdateImage
                imageDataFromModal={detailProduct?.image}
                handleUpdateImage={handleUpdateImage}
              />
            ) : (
              <Box sx={{ width: "1000px" }}>
                {updateDescription ? (
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        color: "#757575",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                      }}
                    >
                      <Typography
                        sx={{ cursor: "pointer" }}
                        onClick={() => setUpdateDescription(!updateDescription)}
                      >
                        Thông tin sản phẩm
                      </Typography>
                      {!DescriptionMode ? (
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: (theme) => theme.commonColors,
                            color: "white",
                          }}
                          onClick={() => setDescriptionMode(!DescriptionMode)}
                        >
                          Chỉnh sửa
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: (theme) => theme.commonColors,
                            color: "white",
                          }}
                          onClick={() => {
                            handleUpdate(valueDescription, "description");
                            setDescriptionMode(!DescriptionMode);
                          }}
                        >
                          Xong
                        </Button>
                      )}
                    </Box>
                    <Box>
                      {!DescriptionMode ? (
                        <MDEditor.Markdown
                          source={valueDescription}
                          style={{
                            whiteSpace: "pre-wrap",
                            height: "400px",
                            overflow: "auto",
                            border: "1px solid",
                          }}
                        />
                      ) : (
                        <MDEditor
                          value={valueDescription}
                          preview="edit"
                          onChange={setValueDescription}
                          height={"500px"}
                        />
                      )}
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    {updateCategoryId ? (
                      <Box>
                        <Typography
                          onClick={() => setUpdateCategoryId(!updateCategoryId)}
                          mb={2}
                          sx={{ cursor: "pointer" }}
                        >
                          Nhấn để trở về
                        </Typography>
                        <FormUpdateCategory
                          open={updateCategoryId}
                          handleUpdateCategoryId={handleUpdateCategoryId}
                          setUpdateCategoryId={setUpdateCategoryId}
                          categoryIdDataFromModal={detailProduct?.categoryId}
                        />
                      </Box>
                    ) : (
                      <Box>
                        {/* name */}
                        <Tooltip title="click to update">
                          <Typography
                            variant="h6"
                            onClick={() =>
                              setUpdateProductName(!updateProductName)
                            }
                          >
                            {detailProduct?.name}
                          </Typography>
                        </Tooltip>
                        {updateProductName && (
                          <ToggleFocusInput
                            multiline
                            value={detailProduct?.name}
                            onChangedValue={(e) => handleUpdate(e, "name")}
                            // inputFontSize="15px"
                          />
                        )}

                        {/* Gia ca */}
                        <Box
                          sx={{
                            p: 2,
                            bgcolor: "#f5f5f5",
                            color: "red",
                            mt: 3,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="h5"
                            onClick={() => setUpdatePrice(!updatePrice)}
                          >
                            {formatPrice(detailProduct?.price)}
                          </Typography>
                          {updatePrice && (
                            <ToggleFocusInput
                              value={detailProduct?.price}
                              onChangedValue={(e) => handleUpdate(e, "price")}
                              // inputFontSize="15px"
                            />
                          )}
                        </Box>

                        {/* tags */}
                        <Box sx={{ mt: 3, width: "100%" }}>
                          <Box
                            sx={{
                              display: "flex",
                              mt: 3,
                              width: "100%",
                            }}
                          >
                            <Box
                              sx={{
                                color: "#757575",
                                width: "25%",
                                cursor: "pointer",
                              }}
                            >
                              <Typography
                                onClick={() => setUpdateTags(!updateTags)}
                              >
                                Loại sản phẩm
                              </Typography>
                            </Box>
                            {detailProduct?.tagsId?.length === 0 ? (
                              <Typography
                                onClick={() => setUpdateTags(!updateTags)}
                              >
                                Thêm loại
                              </Typography>
                            ) : (
                              <Box sx={{ display: "flex", gap: 3 }}>
                                {detailProduct?.tagsId?.map((item, index) => {
                                  return (
                                    <Box
                                      key={index}
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        cursor: "pointer",
                                        mb: 1,
                                        border: "1px solid black",
                                        p: "5px 10px",
                                      }}
                                    >
                                      <Typography variant="caption">
                                        {item}
                                      </Typography>
                                    </Box>
                                  );
                                })}
                              </Box>
                            )}
                          </Box>

                          {updateTags && (
                            <ListTags
                              tagsIdData={detailProduct?.tagsId}
                              handleSelectTags={handleSelectTags}
                            />
                          )}
                          {openSizeList &&
                            detailProduct?.size?.length === 0 && (
                              <SizesList
                                open={openSizeList}
                                handleSelectSize={handleSelectSize}
                              />
                            )}
                          {updateTags && (
                            <Button
                              variant="contained"
                              sx={{ bgcolor: (theme) => theme.commonColors }}
                              onClick={(e) =>
                                handleUpdate(
                                  e,
                                  openSizeList ? "tagsId&Size" : "tagsId"
                                )
                              }
                            >
                              Xong!
                            </Button>
                          )}
                        </Box>

                        {/* phan loai */}
                        <Box sx={{ mt: 3, width: "100%" }}>
                          <Box
                            sx={{
                              display: "flex",
                              mt: 3,
                              width: "100%",
                              flexWrap: "wrap",
                            }}
                          >
                            <Box
                              sx={{
                                color: "#757575",
                                width: "20%",
                                cursor: "pointer",
                                mb: 2,
                              }}
                            >
                              <Typography
                                onClick={() =>
                                  setUpdateCategoryId(!updateCategoryId)
                                }
                              >
                                Phân loại
                              </Typography>
                            </Box>
                            {detailProduct?.categoryId?.length === 0 ? (
                              <Typography
                                onClick={() => {
                                  setUpdateCategoryId(!updateCategoryId);
                                }}
                                sx={{ color: "#757575", cursor: "pointer" }}
                              >
                                Thêm các phân loại sủa sản phẩm (sau khi ấn xác
                                nhận, hãy chờ 1 chút)
                              </Typography>
                            ) : (
                              <Box sx={{ display: "flex", gap: 3 }}>
                                {detailProduct?.categoryId?.map(
                                  (item, index) => {
                                    return (
                                      <Box
                                        key={index}
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 1,
                                          cursor: "pointer",
                                          mb: 1,
                                          border: "1px solid #757575",
                                          p: "5px",
                                        }}
                                      >
                                        <img
                                          src={item?.image}
                                          alt={item?.name}
                                          style={{
                                            width: "30px",
                                            height: "30px",
                                          }}
                                        />
                                        <Typography variant="caption">
                                          {item?.name}
                                        </Typography>
                                      </Box>
                                    );
                                  }
                                )}
                              </Box>
                            )}
                          </Box>
                        </Box>

                        {/* kich co */}
                        <Box sx={{ mt: 3, width: "100%" }}>
                          <Box sx={{ display: "flex", mt: 3, width: "100%" }}>
                            <Box
                              sx={{
                                color: "#757575",
                                width: "20%",
                                cursor: "pointer",
                              }}
                              onClick={() => setOpenSizeList(!openSizeList)}
                            >
                              {detailProduct?.size?.length > 0 && "Kích cỡ"}
                            </Box>
                            <Box
                              sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}
                            >
                              {detailProduct?.size?.map((item, index) => {
                                return (
                                  <Box
                                    key={index}
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      cursor: "pointer",
                                      mb: 1,
                                      border: "1px solid #757575",
                                      p: "5px 10px",
                                    }}
                                  >
                                    <Typography variant="caption">
                                      {item}
                                    </Typography>
                                  </Box>
                                );
                              })}
                            </Box>
                          </Box>
                          {openSizeList && detailProduct?.size?.length >= 0 && (
                            <SizesList
                              sizeData={detailProduct?.size}
                              open={openSizeList}
                              handleSelectSize={handleSelectSize}
                            />
                          )}
                          {openSizeList && detailProduct?.size?.length >= 0 && (
                            <Button
                              variant="contained"
                              sx={{ bgcolor: (theme) => theme.commonColors }}
                              onClick={(e) => handleUpdate(e, "size")}
                            >
                              Xong!
                            </Button>
                          )}
                        </Box>

                        {/* so luong */}
                        <Box sx={{ display: "flex", mt: 3, width: "100%" }}>
                          <Box
                            sx={{
                              color: "#757575",
                              width: "20%",
                              cursor: "pointer",
                            }}
                            onClick={() => setUpdateQuantity(!updateQuantity)}
                          >
                            Số lượng
                          </Box>
                          <Typography>
                            Số lượng có sẵn:
                            {detailProduct?.quantity - detailProduct?.sold}
                          </Typography>
                          {updateQuantity && (
                            <ToggleFocusInput
                              value={detailProduct?.quantity}
                              onChangedValue={(e) =>
                                handleUpdate(e, "quantity")
                              }
                              // inputFontSize="15px"
                            />
                          )}
                        </Box>

                        {/* mieu ta*/}
                        <Box
                          sx={{
                            mt: 3,
                            width: "100%",
                          }}
                        >
                          <Box
                            sx={{
                              color: "#757575",
                              width: "60%",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              setUpdateDescription(!updateDescription)
                            }
                          >
                            Miêu tả sản phẩm (Ấn để xem và chỉnh sửa)
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
