import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { formatPrice } from "../../../../utils/formatter";
import { Grid, Rating } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState } from "react";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ModalDetailProduct = ({
  handleOpenModalDetail,
  open,
  detailProduct,
}) => {
  const [size, setSize] = useState(null);
  const [imageProduct, setImageProduct] = useState(null);
  const [SelectQuantity, setSelectQuantity] = useState(1);
  const [Category, setCategory] = useState("");
  console.log("🚀 ~ detailProduct:", detailProduct);

  const handleClose = () => {
    setSize(null);
    setImageProduct(null);
    handleOpenModalDetail();
  };

  const handleDecrement = () => {
    const newQuantity = SelectQuantity - 1;
    setSelectQuantity(newQuantity);
  };
  const handleIncrement = () => {
    const newQuantity = SelectQuantity + 1;
    setSelectQuantity(newQuantity);
  };
  const handleSetImageProduct = (i) => {
    setImageProduct(i);
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
          {/* <Box
            p={5}
            border={"1px solid"}
            my={3}
            sx={{
              "& .swiper": {
                width: "800px",
                height: "20px",
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
              slidesPerView={3}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
            >
              <SwiperSlide>Slide 1</SwiperSlide>
              <SwiperSlide>Slide 2</SwiperSlide>
              <SwiperSlide>Slide 3</SwiperSlide>
              <SwiperSlide>Slide 4</SwiperSlide>
              <SwiperSlide>Slide 5</SwiperSlide>
              <SwiperSlide>Slide 6</SwiperSlide>
              <SwiperSlide>Slide 7</SwiperSlide>
              <SwiperSlide>Slide 8</SwiperSlide>
              <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper>
          </Box> */}
          <Box sx={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Box
              sx={{
                width: "500px",
                height: "500px",
              }}
            >
              {!imageProduct ? (
                <img
                  src={
                    detailProduct?.image?.length > 0
                      ? detailProduct?.image[0]
                      : null
                  }
                  alt={detailProduct?.name}
                  style={{
                    width: "100%",
                    border: "1px solid",
                  }}
                />
              ) : (
                <img
                  src={imageProduct}
                  alt={detailProduct?.name}
                  style={{ width: "100%", border: "1px solid" }}
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
                  slidesPerView={2}
                  spaceBetween={30}
                >
                  {detailProduct?.image?.map((i, index) => {
                    return (
                      <SwiperSlide>
                        <Grid>
                          <img
                            src={i}
                            alt={i}
                            style={{ width: "80px", border: "1px solid" }}
                            key={index}
                            onClick={() => handleSetImageProduct(i)}
                          />
                        </Grid>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </Box>
            </Box>

            <Box>
              <Typography variant="h6">{detailProduct?.name}</Typography>

              {/* Gia ca */}
              <Box sx={{ p: 2, bgcolor: "#f5f5f5", color: "red", mt: 3 }}>
                <Typography variant="h5">
                  {formatPrice(detailProduct?.price)}
                </Typography>
              </Box>

              {/* tags */}
              <Box sx={{ display: "flex", mt: 3, width: "100%" }}>
                <Box sx={{ color: "#757575", width: "25%" }}>Loại sản phẩm</Box>
                <Box sx={{ display: "flex", gap: 3 }}>
                  {detailProduct?.tagsId?.map((item) => {
                    return (
                      <Box
                        key={item?._id}
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
                        <Typography variant="caption">{item}</Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>

              {/* phan loai */}
              <Box sx={{ display: "flex", mt: 3, width: "100%" }}>
                <Box sx={{ color: "#757575", width: "20%" }}>
                  {detailProduct?.categoryId?.length > 0 && "Phân loại"}
                </Box>
                <Box sx={{ display: "flex", gap: 3 }}>
                  {detailProduct?.categoryId?.map((item) => {
                    if (item.name === Category) {
                      return (
                        <Box
                          key={item.id}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            cursor: "pointer",
                            mb: 1,
                            border: "1px solid red",
                            p: "5px",
                          }}
                          // onClick={() => {
                          //   setDisplayImage(item.image);
                          //   setSelectColor(item.name);
                          // }}
                        >
                          <img
                            src={item?.image}
                            alt={item?.name}
                            style={{ width: "30px", height: "30px" }}
                          />
                          <Typography variant="caption">
                            {item?.name}
                          </Typography>
                        </Box>
                      );
                    } else {
                      return (
                        <Box
                          key={item?.id}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            cursor: "pointer",
                            mb: 1,
                            border: "1px solid #757575",
                            p: "5px",
                          }}
                          // onClick={() => {
                          //   setDisplayImage(item.image);
                          //   setSelectColor(item.name);
                          // }}
                        >
                          <img
                            src={item?.image}
                            alt={item?.name}
                            style={{ width: "30px", height: "30px" }}
                          />
                          <Typography variant="caption">
                            {item?.name}
                          </Typography>
                        </Box>
                      );
                    }
                  })}
                </Box>
              </Box>

              {/* kich co */}
              <Box sx={{ display: "flex", mt: 3, width: "100%" }}>
                <Box sx={{ color: "#757575", width: "20%" }}>
                  {detailProduct?.size?.length > 0 && "Kích cỡ"}
                </Box>
                <Box sx={{ display: "flex", gap: 3 }}>
                  {detailProduct?.size?.map((item) => {
                    if (item === size) {
                      return (
                        <Box
                          key={item?._id}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            cursor: "pointer",
                            mb: 1,
                            border: "1px solid red",
                            p: "5px 10px",
                          }}
                          // onClick={() => {
                          //   setSize(item);
                          // }}
                        >
                          <Typography variant="caption">{item}</Typography>
                        </Box>
                      );
                    } else {
                      return (
                        <Box
                          key={item?._id}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            cursor: "pointer",
                            mb: 1,
                            border: "1px solid #757575",
                            p: "5px 10px",
                          }}
                          // onClick={() => {
                          //   setSize(item);
                          // }}
                        >
                          <Typography variant="caption">{item}</Typography>
                        </Box>
                      );
                    }
                  })}
                </Box>
              </Box>

              {/* so luong */}
              <Box sx={{ display: "flex", mt: 3, width: "100%" }}>
                <Box sx={{ color: "#757575", width: "20%" }}>Số lượng</Box>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      cursor: "pointer",
                      mb: 1,
                      border: "1px solid #757575",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      sx={{
                        color: (theme) => theme.commonColors,
                        border: "1px solid ",
                        borderColor: "transparent",
                        borderRightColor: "#757575",
                        borderRadius: "0px",
                      }}
                      onClick={() => {
                        if (SelectQuantity > 1) {
                          handleDecrement();
                        } else if (SelectQuantity === 1) {
                          toast.error("Vui lòng chọn ít nhất 1 sản phẩm");
                        }
                      }}
                    >
                      -
                    </Button>
                    <Typography
                      sx={{ color: (theme) => theme.commonColors, mx: 2 }}
                    >
                      {SelectQuantity}
                    </Typography>
                    <Button
                      sx={{
                        color: (theme) => theme.commonColors,
                        border: "1px solid ",
                        borderColor: "transparent",
                        borderLeftColor: "#757575",
                        borderRadius: "0px",
                      }}
                      onClick={() => {
                        if (
                          SelectQuantity <
                          detailProduct?.quantity - detailProduct?.sold
                        ) {
                          handleIncrement();
                        } else if (
                          SelectQuantity ===
                          detailProduct?.quantity - detailProduct?.sold
                        ) {
                          toast.error(`Vượt quá số lượng có sẵn`);
                        }
                      }}
                    >
                      +
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 2,
                    }}
                  >
                    <Typography>
                      Số lượng có sẵn:{" "}
                      {detailProduct?.quantity - detailProduct?.sold}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
