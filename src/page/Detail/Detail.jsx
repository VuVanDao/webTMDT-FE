import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { formatPrice } from "../../utils/formatter";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { toast } from "react-toastify";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserAPI,
  userInfoSelector,
} from "../../redux/slice/userInfoSlice";
import { getProductById } from "../../api";
import DetailLoading from "./DetailLoading";

import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { v4 as uuidv4 } from "uuid";
import ShopOwnerProduct from "./ShopOwnerProduct";
import MDEditor from "@uiw/react-md-editor";
import moment from "moment";

const Detail = () => {
  const [DetailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [displayImage, setDisplayImage] = useState(null);
  const [displayPrice, setDisplayPrice] = useState(null);
  const [displayQuantity, setDisplayQuantity] = useState(null);

  const [SelectQuantity, setSelectQuantity] = useState(1);
  const [SelectCategory, setSelectCategory] = useState("");
  const [SelectRating, setSelectRating] = useState(null);
  const [size, setSize] = useState("");
  const [dataCartFromUserSlice, setDataCartFromUserSlice] = useState([]);

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);

  const userInfo = useSelector(userInfoSelector);

  const dispatch = useDispatch();

  const ratingSelection = [
    {
      id: 1,
      title: "Tất cả",
      value: "All",
    },
    {
      id: 2,
      title: "5 Sao",
      value: 5,
    },
    {
      id: 3,
      title: "4 Sao",
      value: 4,
    },
    {
      id: 4,
      title: "3 Sao",
      value: 3,
    },
    {
      id: 5,
      title: "2 Sao",
      value: 2,
    },
    {
      id: 6,
      title: "1 Sao",
      value: 1,
    },
  ];

  const getDataProduct = async (id) => {
    try {
      setLoading(true);
      const getData = await getProductById(id);
      if (!getData) {
        navigate("/");
        return;
      }
      setDetailData(getData);
      setDisplayImage(getData?.image[0]);
      setDisplayPrice(getData?.price);
      let totalQuantity = 0;
      getData?.categoryId.map((item) => {
        totalQuantity += item.quantity;
      });
      setDisplayQuantity(totalQuantity);
    } catch (error) {
      toast.error("Failed to load product details");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setDataCartFromUserSlice(userInfo?.cartItem);
    if (id) {
      getDataProduct(id);
    }
  }, [id]);
  const handleDecrement = () => {
    const newQuantity = SelectQuantity - 1;
    setSelectQuantity(newQuantity);
  };
  const handleIncrement = () => {
    const newQuantity = SelectQuantity + 1;
    setSelectQuantity(newQuantity);
  };
  const handleSelect = (choose) => {
    if (!userInfo) {
      toast.warn("you need to login first");
      navigate("/login");
      return;
    }

    if (choose === "buy") {
      //buy
      if (!SelectCategory) {
        toast.error("Vui lòng chọn phân loại sản phẩm");
        return;
      }
      let price = displayPrice;
      if (SelectQuantity > 1) {
        price *= SelectQuantity;
      }
      let dataSend = {
        name: DetailData?.name,
        category: SelectCategory
          ? SelectCategory
          : DetailData[0]?.categoryId[0]?.name,
        image: displayImage ? displayImage : DetailData?.categoryId[0]?.image,
        quantity: SelectQuantity ? SelectQuantity : 1,
        price: price,
        size: size ? size : null,
        ProductId: id,
        cartOwnerId: userInfo?._id,
        shopId: DetailData?.shopId,
      };

      navigate(`/checkout?id=${id}`, {
        state: { data: dataSend },
      });
    } else {
      //add to cart
      if (DetailData?.categoryId.length > 0) {
        if (!SelectCategory) {
          toast.error("Vui lòng chọn phân loại sản phẩm");
          return;
        }
      }
      if (DetailData?.size && DetailData?.size?.length > 0) {
        if (!size) {
          toast.error("Vui lòng chọn phân loại kích cỡ");
          return;
        }
      }

      let price = displayPrice;
      if (SelectQuantity > 1) {
        price *= SelectQuantity;
      }
      let dataSend = {
        name: DetailData?.name,
        category: SelectCategory
          ? SelectCategory
          : DetailData[0]?.categoryId[0]?.name,
        image: displayImage ? displayImage : DetailData?.categoryId[0]?.image,
        quantity: SelectQuantity ? SelectQuantity : 1,
        price: price,
        size: size ? size : null,
        ProductId: id,
        cartOwnerId: userInfo?._id,
        shopId: DetailData?.shopId,
        id: uuidv4(),
      };

      toast
        .promise(
          dispatch(
            updateUserAPI({
              cartItem: [
                ...dataCartFromUserSlice,
                {
                  ...dataSend,
                  cartOwnerId: userInfo?._id,
                },
              ],
            })
          ),
          {
            pending: "Đang cập nhật giỏ hàng",
          }
        )
        .then((res) => {
          if (!res.error) {
            toast.success("Sản phẩm đã thêm vào giỏ hàng thành công");
          }
        })
        .finally((res) => {
          // console.log("🚀 ~ ).then ~ res:", res);
        });
    }
  };
  const handleRatingAverage = () => {
    if (!DetailData?.comments?.length) return 0;
    const totalRating = DetailData.comments.reduce(
      (sum, item) => sum + (item?.rating || 0),
      0
    );
    return totalRating / DetailData.comments.length;
  };
  if (loading) {
    return <DetailLoading />;
  }
  if (!DetailData) {
    return <Box>nothing!!!!</Box>;
  }
  return (
    <Box>
      <Header showHeader={true} />
      <Box
        sx={{
          bgcolor: "#f5f5f5",
          py: 3,
        }}
      >
        <Container sx={{ minWidth: "1200px !important" }}>
          <Box sx={{ bgcolor: "white", color: "black", p: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
              }}
            >
              {/* right */}
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <img
                  src={displayImage}
                  alt={DetailData?.name}
                  style={{
                    width: "100%",
                    border: "1px solid",
                    maxWidth: "350px",
                    height: "305px",
                  }}
                />
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
                    {DetailData?.image?.map((i, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <Grid>
                            <img
                              src={i}
                              alt={i}
                              style={{ width: "80px", border: "1px solid" }}
                              onClick={() => setDisplayImage(i)}
                            />
                          </Grid>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </Box>
              </Box>

              {/* left */}
              <Box>
                <Typography variant="h6">{DetailData?.name}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Rating
                    name="size-large"
                    defaultValue={
                      DetailData?.sold >= 1 ? handleRatingAverage() : 5
                    }
                    size="small"
                    sx={{
                      ".MuiRating-icon": {
                        color: "rgb(250, 175, 0)",
                      },
                    }}
                    readOnly
                  />
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography sx={{ fontSize: "13px" }}>Đã bán:</Typography>
                    <Typography>{DetailData?.sold}</Typography>
                  </Box>
                </Box>

                {/* price */}
                <Box sx={{ p: 2, bgcolor: "#f5f5f5", color: "red" }}>
                  <Typography variant="h5">
                    {formatPrice(displayPrice)}
                  </Typography>
                </Box>

                {/* ship option */}
                <Box sx={{ display: "flex", mt: 3, width: "100%" }}>
                  <Box sx={{ color: "#757575", width: "20%" }}>Vận chuyển</Box>
                  <Box>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        cursor: "pointer",
                        mb: 1,
                      }}
                    >
                      Vận chuyển vào hôm nay
                      <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />
                    </Typography>
                    <Typography>Miễn phí vận chuyển</Typography>
                    <Typography
                      sx={{ fontSize: "12px", mt: 1, color: "#757575" }}
                    >
                      Tặng Voucher ₫15.000 nếu đơn giao sau thời gian trên.
                    </Typography>
                  </Box>
                </Box>

                {/* phan loai */}
                <Box sx={{ display: "flex", mt: 3, width: "100%" }}>
                  <Box sx={{ color: "#757575", width: "20%" }}>
                    {DetailData?.categoryId?.length > 0 && "Phân loại"}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 3,
                      flexWrap: "wrap",
                    }}
                  >
                    {DetailData?.categoryId?.map((item) => {
                      if (item.name === SelectCategory) {
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
                              p: "5px 10px",
                            }}
                            onClick={() => {
                              setDisplayImage(item?.image);
                              setDisplayPrice(item?.price);
                              setDisplayQuantity(item?.quantity);
                              setSelectCategory(item?.name);
                            }}
                          >
                            <img
                              src={item?.image}
                              alt={item?.name}
                              style={{ width: "30px", height: "30px" }}
                            />
                            <Typography>{item?.name}</Typography>
                          </Box>
                        );
                      } else {
                        return (
                          <Box
                            key={item.id}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              cursor: "pointer",
                              mb: 1,
                              border: "1px solid #757575",
                              p: "5px 10px",
                            }}
                            onClick={() => {
                              setDisplayImage(item?.image);
                              setDisplayPrice(item?.price);
                              setDisplayQuantity(item?.quantity);
                              setSelectCategory(item?.name);
                            }}
                          >
                            <img
                              src={item?.image}
                              alt={item?.name}
                              style={{ width: "30px", height: "30px" }}
                            />
                            <Typography>{item?.name}</Typography>
                          </Box>
                        );
                      }
                    })}
                  </Box>
                </Box>

                {/* kich co */}
                <Box sx={{ display: "flex", mt: 3, width: "100%" }}>
                  <Box sx={{ color: "#757575", width: "20%" }}>
                    {DetailData?.size?.length > 0 && "Kích cỡ"}
                  </Box>
                  <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                    {DetailData?.size?.map((item, index) => {
                      if (item === size) {
                        return (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              cursor: "pointer",
                              mb: 1,
                              border: "1px solid red",
                              p: "5px 10px",
                            }}
                            onClick={() => {
                              setSize(item);
                            }}
                          >
                            <Typography fontSize={"14px"}>{item}</Typography>
                          </Box>
                        );
                      } else {
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
                            onClick={() => {
                              setSize(item);
                            }}
                          >
                            <Typography fontSize={"14px"}>{item}</Typography>
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
                          if (SelectQuantity < displayQuantity) {
                            handleIncrement();
                          } else if (SelectQuantity >= displayQuantity) {
                            toast.error(`Vượt quá số lượng có sẵn`);
                            setSelectQuantity(displayQuantity);
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
                        Số lượng có sẵn: {displayQuantity}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", mt: 2, width: "100%", gap: 2 }}>
                  <Button
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      borderColor: (theme) => theme.commonColors,
                      color: (theme) => theme.commonColors,
                      bgcolor: "#ffeee8",
                    }}
                    onClick={() => {
                      handleSelect("add");
                    }}
                  >
                    <AddShoppingCartIcon sx={{ mr: 1 }} />
                    Thêm vào giỏ hàng
                  </Button>
                  <Button
                    sx={{
                      p: 1.5,
                      color: "white",
                      bgcolor: (theme) => theme.commonColors,
                    }}
                    onClick={() => {
                      handleSelect("buy");
                    }}
                  >
                    Mua với voucher {formatPrice(displayPrice)}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* shopInfo */}
          <ShopOwnerProduct ShopInfo={DetailData?.ShopInfo[0]} />

          <Box sx={{ bgcolor: "white", color: "black", p: 3, mt: 2 }}>
            <Typography
              sx={{
                p: 2,
                bgcolor: "#f5f5f5",
                color: "black",
                display: "flex",
                alignItems: "center",
                textTransform: "uppercase",
                fontSize: "20px",
              }}
            >
              Chi tiết sản phẩm
            </Typography>

            <Box sx={{ mt: 2, pl: 2 }}>
              {DetailData?.tagsId?.map((item, index) => (
                <Typography
                  color="rgba(0,0,0,0.4)"
                  sx={{ cursor: "pointer", display: "inline", mr: 2 }}
                  key={index}
                >
                  {item}
                </Typography>
              ))}
            </Box>

            <Box sx={{ display: "flex", gap: 5, mt: 3, pl: 2 }}>
              <Typography color="rgba(0,0,0,0.4)">
                Số sản phẩm còn lại
              </Typography>
              <Typography color="#fa5130">
                {DetailData?.quantity - DetailData?.sold}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 5, mt: 3, pl: 2 }}>
              <Typography color="rgba(0,0,0,0.4)">Gửi từ</Typography>
              <Typography color="#fa5130">
                {DetailData?.ShopInfo[0].address}
              </Typography>
            </Box>

            <Typography
              sx={{
                p: 2,
                bgcolor: "#f5f5f5",
                color: "black",
                display: "flex",
                alignItems: "center",
                textTransform: "uppercase",
                fontSize: "20px",
                my: 2,
              }}
            >
              Mô tả sản phẩm
            </Typography>
            {DetailData?.description && (
              <Box pl={2}>
                <MDEditor.Markdown
                  source={DetailData?.description}
                  style={{
                    whiteSpace: "pre-wrap",
                  }}
                />
              </Box>
            )}
          </Box>

          <Box sx={{ bgcolor: "white", color: "black", p: 3, mt: 2 }}>
            <Typography
              sx={{
                px: 2,
                color: "black",
                textTransform: "uppercase",
                fontSize: "20px",
                mb: 2,
              }}
            >
              Đánh giá sản phẩm
            </Typography>
            <Box
              sx={{
                bgcolor: "#ffeee8",
                m: 2,
                p: 3,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Box>
                <Box
                  sx={{
                    color: "#fa5130",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography style={{ fontSize: "30px" }}>
                    {handleRatingAverage()}
                  </Typography>
                  <Typography> trên 5</Typography>
                </Box>
                <Rating
                  value={handleRatingAverage()}
                  readOnly
                  precision={0.5}
                  sx={{
                    ".MuiRating-icon": {
                      color: "red",
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  flexWrap: "wrap",
                  height: "20px",
                }}
              >
                {ratingSelection.map((item) => {
                  if (item.value === SelectRating) {
                    return (
                      <Box
                        key={item.id}
                        sx={{
                          cursor: "pointer",
                          border: "1px solid red",
                          p: "5px 20px",
                          bgcolor: "white",
                          color: "black",
                          borderRadius: "2px",
                        }}
                        onClick={() => {
                          setSelectRating(item.value);
                        }}
                      >
                        <Typography>{item.title}</Typography>
                      </Box>
                    );
                  } else {
                    return (
                      <Box
                        key={item.id}
                        sx={{
                          cursor: "pointer",
                          border: "1px solid black",
                          p: "5px 20px",
                          bgcolor: "white",
                          color: "black",
                          borderRadius: "2px",
                        }}
                        onClick={() => {
                          setSelectRating(item.value);
                        }}
                      >
                        <Typography>{item.title}</Typography>
                      </Box>
                    );
                  }
                })}
              </Box>
            </Box>

            <Box px={2}>
              {DetailData?.comments?.map((item, index) => (
                <Box
                  sx={{ display: "flex", gap: 1, width: "100%", mb: 1.5 }}
                  key={index}
                >
                  <Tooltip title={item?.username}>
                    <Avatar
                      sx={{ width: 36, height: 36, cursor: "pointer" }}
                      alt={item?.username}
                      src={item?.userAvatar}
                    />
                  </Tooltip>
                  <Box sx={{ width: "inherit" }}>
                    <Typography
                      variant="span"
                      sx={{ fontWeight: "bold", mr: 1 }}
                    >
                      {item?.username}
                    </Typography>

                    <Typography variant="span" sx={{ fontSize: "12px" }}>
                      {moment(item?.commentAt).format("llll")}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      Đánh giá:
                      <Rating
                        defaultValue={item?.rating}
                        size="small"
                        readOnly
                      />
                    </Box>

                    <Box
                      sx={{
                        display: "block",
                        bgcolor: "white",
                        mt: "4px",
                        border: "0.5px solid transparent",
                        color: "black",
                        wordBreak: "break-word",
                      }}
                    >
                      {item?.commentContent}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Detail;
