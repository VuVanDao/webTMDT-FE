import {
  Box,
  Button,
  Container,
  Divider,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Header from "../../components/Header";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { formatPrice } from "../../utils/formatter";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";
import { NotificationData } from "../../components/Notification/NotificationData";
import { createNewOrder, getProductById } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserAPI,
  userInfoSelector,
} from "../../redux/slice/userInfoSlice";
import { socketIoInstance } from "../../main";
const CheckoutPage = () => {
  const userInfo = useSelector(userInfoSelector);
  let [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);
  const location = useLocation();

  if (location?.state?.data === undefined) {
    return <Navigate to="/homePage" />;
  }
  const { price, name, category, quantity, image, size, shopId } =
    location?.state?.data;

  useEffect(() => {}, []);
  const CustomTableCell = styled(TableCell)(({ theme }) => ({
    color: "black",
  }));
  const formatVietnameseDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // tháng trong JS bắt đầu từ 0
    return `${day} Tháng ${month}`;
  };

  const today = new Date();
  const twoDaysLater = new Date();
  twoDaysLater.setDate(today.getDate() + 2);

  const formattedToday = formatVietnameseDate(today);
  const formattedLater = formatVietnameseDate(twoDaysLater);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckOut = () => {
    toast
      .promise(
        dispatch(
          updateUserAPI({
            cartItem:
              userInfo?.cartItem?.length === 1
                ? []
                : [...userInfo?.cartItem?.filter((i) => i.id !== id)],
          })
        ),
        {
          pending: ".....",
        }
      )
      .then((res) => {
        if (!res.error) {
          toast.success("Đặt hàng thành công");
          const order = {
            price: +price,
            name,
            category,
            quantity,
            image,
            size,
            customerInfo: {
              address: userInfo?.address,
              phoneNumber: userInfo?.phoneNumber,
              email: userInfo?.email,
              avatar: userInfo?.avatar,
            },
            customerId: userInfo?._id,
            productId: id,
            shopId,
          };
          console.log("🚀 ~ .then ~ order:", order);
          createNewOrder(order).then((res) => {
            if (!res.error)
              socketIoInstance.emit("user_place_an_order_fe", order);
          });
        }
      });

    if (location?.state?.check) {
      navigate("/cartDetail");
      return;
    }
    navigate("/homePage");
  };
  return (
    <Box>
      <Header showHeader={false} />
      <Box sx={{ bgcolor: "white" }}>
        <Container sx={{ py: 3 }} maxWidth="lg">
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
            component={Link}
            to={"/homePage"}
          >
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg"
              }
              style={{ width: "120px", cursor: "pointer" }}
            />
            <Divider
              orientation="vertical"
              variant="middle"
              sx={{ bgcolor: "red", height: "35px" }}
            />
            <Typography
              sx={{ color: (theme) => theme.commonColors, fontSize: "25px" }}
            >
              Thanh toán
            </Typography>
          </Box>
        </Container>
        <Box sx={{ bgcolor: (theme) => theme.bgColor, py: 3 }}>
          <Container>
            <Box
              sx={{
                p: 3,
                bgcolor: "white",
                color: (theme) => theme.commonColors,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <FmdGoodIcon />
                <Typography variant="h6">Địa chỉ nhận hàng</Typography>
              </Box>
              <Box>
                <Typography sx={{ color: "black" }} variant="h6">
                  {userInfo?.username} (+84) {userInfo?.phoneNumber}
                </Typography>
                <Typography sx={{ color: "black" }}>
                  {userInfo?.address}
                </Typography>
              </Box>
            </Box>
          </Container>
          <Container>
            <Box
              sx={{
                color: "black",
                p: 3,
                bgcolor: "white",
                mt: 2,
              }}
            >
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <CustomTableCell>Sản phẩm</CustomTableCell>
                      <CustomTableCell align="right">Đơn giá</CustomTableCell>
                      <CustomTableCell align="right">Số lượng</CustomTableCell>
                      <CustomTableCell align="right">
                        Thành tiền
                      </CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <CustomTableCell>
                        <Box sx={{ display: "flex", gap: 4, width: "550px" }}>
                          <Box>
                            <img src={image} style={{ width: "50px" }} />
                          </Box>
                          <Box>
                            <Typography sx={{ overflowX: "hidden" }}>
                              {name} loại {category}{" "}
                              {size ? `Kích cỡ ${size}` : ""}
                            </Typography>
                          </Box>
                        </Box>
                      </CustomTableCell>
                      <CustomTableCell align="right">
                        {formatPrice(price / quantity)}
                      </CustomTableCell>
                      <CustomTableCell align="right">
                        {quantity}
                      </CustomTableCell>
                      <CustomTableCell align="right">
                        {formatPrice(price)}
                      </CustomTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box
                sx={{
                  display: "flex",
                  px: 3,
                  borderBottom: "1px dashed rgba(0, 0, 0, .09)",
                  bgcolor: "#fafdff",
                  color: "rgb(219 219 219)",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    width: "40%",
                  }}
                >
                  <Typography>Lời nhắn:</Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Lời nhắn cho người bán"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "black",
                        "& fieldset": {
                          borderColor: "#757575",
                        },
                        "&:hover fieldset": {
                          borderColor: "#757575",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#757575",
                          color: "black",
                        },
                      },
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    p: 5,
                    color: "rgb(219 219 219)",
                    borderLeft: "1px dashed rgba(0, 0, 0, .09)",
                    width: "60%",
                    gap: 3,
                  }}
                >
                  <Typography>Phương thức vận chuyển:</Typography>
                  <Box>
                    <Typography sx={{ color: "black" }}>
                      Nhanh (20000đ)
                    </Typography>
                    <Typography sx={{ color: "black" }}>
                      Đảm bảo nhận hàng {formattedToday} - {formattedLater}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                <Typography>
                  Thành tiền ({quantity} sản phẩm): {formatPrice(price + 20000)}
                </Typography>
              </Box>
            </Box>
          </Container>
          <Container>
            <Box sx={{ bgcolor: "white", my: 3 }}>
              <Box
                sx={{
                  color: "black",
                  p: 3,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography>Phương thức thanh toán</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <Box>Thanh toán khi nhận hàng</Box>
                  <Box>THAY ĐỔI</Box>
                </Box>
              </Box>

              <Box
                sx={{
                  color: "black",
                  p: 3,
                  display: "flex",
                  justifyContent: "flex-end",
                  bgcolor: "rgb(255, 254, 251)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 10,
                    justifyContent: "flex-end",
                    width: "450px",
                  }}
                >
                  <Box>Tổng tiền hàng</Box>
                  <Box> {formatPrice(price)}</Box>
                </Box>
              </Box>

              <Box
                sx={{
                  color: "black",
                  p: 3,
                  display: "flex",
                  justifyContent: "flex-end",
                  bgcolor: "rgb(255, 254, 251)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 10,
                    justifyContent: "flex-end",
                    width: "450px",
                  }}
                >
                  <Box>Tổng tiền phí vận chuyển</Box>
                  <Box> {formatPrice(20000)}</Box>
                </Box>
              </Box>

              <Box
                sx={{
                  color: "black",
                  p: 3,
                  display: "flex",
                  justifyContent: "flex-end",
                  bgcolor: "rgb(255, 254, 251)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    justifyContent: "flex-end",
                    width: "450px",
                  }}
                >
                  <Box>Tổng thanh toán</Box>
                  <Box>
                    <Typography
                      sx={{
                        color: (theme) => theme.commonColors,
                        // fontSize: "25px",
                      }}
                    >
                      {formatPrice(+price + 20000)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  color: "black",
                  p: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography>
                    Khi nhấn 'Đặt hàng', bạn xác nhận rằng bạn đồng ý với Điều
                    khoản Shopee của Shopee.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Box>Thanh toán khi nhận hàng</Box>
                  <Box>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: (theme) => theme.commonColors,
                        color: "white",
                      }}
                      onClick={handleCheckOut}
                    >
                      Đặt hàng
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default CheckoutPage;
