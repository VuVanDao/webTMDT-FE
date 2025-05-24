import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllProduct } from "../../../api";
import { userInfoSelector } from "../../../redux/slice/userInfoSlice";
import { useSelector } from "react-redux";
import { formatPrice } from "../../../utils/formatter";
import { ModalDetailProduct } from "./Modal/ModalDetailProduct";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const GetAllProduct = () => {
  const [listProduct, setListProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [detailProductId, setDetailProductId] = useState(null);
  const userInfo = useSelector(userInfoSelector);

  const handleOpenModalDetail = (item) => {
    setDetailProductId(item?._id);
    setOpen(!open);
  };
  const handleGetAllProduct = async () => {
    const res = await getAllProduct(userInfo.shopId);
    if (!res.error) {
      setListProduct(res);
    }
  };

  useEffect(() => {
    handleGetAllProduct();
  }, []);

  return (
    <Container sx={{ my: 3, bgcolor: (theme) => theme.whiteColor, p: 3 }}>
      <Box my={2}>
        <Typography variant="h5">Danh sách sản phẩm của bạn</Typography>
        <Typography variant="button">
          {listProduct?.length} sản phẩm có sẵn
        </Typography>
      </Box>
      <Box>
        <Grid container spacing={2}>
          {listProduct.map((item) => {
            return (
              <Grid
                size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
                key={item?._id}
                sx={{ display: "flex" }}
              >
                <Box
                  sx={{
                    // border: "1px solid rgba(0, 0, 0, .05)",
                    border: "1px solid black",
                    textAlign: "center",
                    "&:hover": {
                      borderColor: (theme) => theme.commonColors,
                      boxShadow: "0 0 .8125rem 0 rgba(0, 0, 0, .05)",
                      transform: "scale(1)",
                    },
                    overflow: "hidden",
                    bgcolor: "white",
                    p: "5px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleOpenModalDetail(item);
                  }}
                >
                  <img
                    src={item?.image[0]}
                    alt={item?.name}
                    style={{
                      width: "100%",
                      border: "1px solid black",
                      height: "180px",
                    }}
                  />
                  <Box sx={{ p: 1 }}>
                    <Box
                      sx={{
                        height: "50px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: "black",
                        mb: 3,
                      }}
                    >
                      <Typography>{item?.name}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "black",
                        alignItems: "center",
                      }}
                    >
                      <Typography>{formatPrice(item?.price)}</Typography>
                      <Typography sx={{ fontSize: "14px" }}>
                        Đã bán: {item?.sold}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box
        p={5}
        border={"1px solid"}
        mt={3}
        sx={{
          "& .swiper": {
            width: "100%",
            height: "100%",
          },
          "& .swiper-slide": {
            textAlign: "center",
            fontSize: "18px",
          },
          "& .swiper-slide img": {
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          },
        }}
      >
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
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
      </Box>
      {detailProductId && (
        <ModalDetailProduct
          open={open}
          handleOpenModalDetail={handleOpenModalDetail}
          detailProductId={detailProductId}
          handleGetAllProduct={handleGetAllProduct}
        />
      )}
    </Container>
  );
};

export default GetAllProduct;
