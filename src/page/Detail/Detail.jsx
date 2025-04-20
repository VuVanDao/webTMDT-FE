import { Box, Button, Container, Rating, Typography } from "@mui/material";
import React, { use, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RecommendData } from "../../Data/RecommenData";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { formatPrice } from "../../utils/formatter";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { toast } from "react-toastify";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const Detail = () => {
  const [DetailData, setDetailData] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [SelectQuantity, setSelectQuantity] = useState(1);
  const [SelectColor, setSelectColor] = useState("");
  const [selection, setSelection] = useState({});
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);
  useEffect(() => {
    const getData = RecommendData.find((item) => item.id == id);
    setDetailData(getData);
    setDisplayImage(getData?.image);
  }, []);
  const handleDecrement = () => {
    const newQuantity = SelectQuantity - 1;
    setSelectQuantity(newQuantity);
  };
  const handleIncrement = () => {
    const newQuantity = SelectQuantity + 1;
    setSelectQuantity(newQuantity);
  };
  const handleSelect = (choose) => {
    if (choose === "buy") {
      if (!SelectColor) {
        toast.error("Vui lòng chọn màu sắc sản phẩm");
        return;
      }
      let price = DetailData?.price;
      if (SelectQuantity > 1) {
        price *= SelectQuantity;
      }
      let dataSend = {
        name: DetailData?.name,
        color: SelectColor ? SelectColor : DetailData?.color[0]?.name,
        quantity: SelectQuantity ? SelectQuantity : 1,
        price: price,
      };
      setSelection(dataSend);
      navigate(`/checkout?id=${id}`, {
        state: { data: dataSend },
      });
    } else {
      if (!SelectColor) {
        toast.error("Vui lòng chọn màu sắc sản phẩm");
        return;
      }
      let price = DetailData?.price;
      if (SelectQuantity > 1) {
        price *= SelectQuantity;
      }
      let dataSend = {
        name: DetailData?.name,
        color: SelectColor ? SelectColor : DetailData?.color[0]?.name,
        quantity: SelectQuantity ? SelectQuantity : 1,
        price: price,
      };
      setSelection(dataSend);
      // toast.success("Thêm vào giỏ hàng thành công");
    }
  };
  console.log("🚀 ~ handleSelect ~ selection:", selection);

  return (
    <Box>
      <Header showHeader={true} />
      <Box
        sx={{
          bgcolor: "#f5f5f5",
          height: (theme) => `calc(100vh - ${theme.customHeight.Header})`,
        }}
      >
        <Container sx={{ p: 3 }}>
          <Box sx={{ bgcolor: "white", color: "black", p: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
              <Box
                sx={{
                  width: "500px",
                  height: "500px",
                }}
              >
                <img
                  src={displayImage}
                  alt={DetailData?.name}
                  style={{ width: "100%" }}
                />
              </Box>
              <Box>
                <Typography variant="h6">{DetailData?.name}</Typography>
                <Rating
                  name="size-large"
                  defaultValue={2}
                  size="small"
                  sx={{
                    ".MuiRating-icon": {
                      color: "rgb(250, 175, 0)",
                    },
                  }}
                />
                <Box sx={{ p: 2, bgcolor: "#f5f5f5", color: "red" }}>
                  <Typography variant="h5">
                    {formatPrice(DetailData?.price)}
                  </Typography>
                </Box>

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

                <Box sx={{ display: "flex", mt: 3, width: "100%" }}>
                  <Box sx={{ color: "#757575", width: "20%" }}>Màu sắc</Box>
                  <Box sx={{ display: "flex", gap: 3 }}>
                    {DetailData?.color?.map((item) => {
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
                            p: "5px",
                          }}
                          onClick={() => {
                            setDisplayImage(item.image);
                            setSelectColor(item.name);
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: "30px", height: "30px" }}
                          />
                          <Typography>{item.name}</Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>

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
                        p: "5px",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        sx={{ color: (theme) => theme.commonColors }}
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
                      <Typography sx={{ color: (theme) => theme.commonColors }}>
                        {SelectQuantity}
                      </Typography>
                      <Button
                        sx={{ color: (theme) => theme.commonColors }}
                        onClick={() => {
                          if (SelectQuantity < DetailData?.quantity) {
                            handleIncrement();
                          } else if (SelectQuantity === DetailData?.quantity) {
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
                        Số lượng có sẵn {DetailData?.quantity}
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
                    Mua với voucher {formatPrice(DetailData?.price)}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Detail;
