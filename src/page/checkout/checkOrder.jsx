import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getOrderAPI } from "../../api/OrderAPI/OrderAPI";
import { deleteOrder, updateOrder } from "../../api";
import { Box, Button, Container, Typography } from "@mui/material";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const CheckoutOrder = () => {
  const [data, setData] = useState({});
  let [searchParams] = useSearchParams();
  const {
    vnp_Amount,
    vnp_BankCode,
    vnp_CardType,
    vnp_PayDate,
    vnp_OrderInfo,
    vnp_ResponseCode,
  } = Object.fromEntries([...searchParams]);
  const navigate = useNavigate();
  const handleGetOrder = async () => {
    if (vnp_ResponseCode === "00") {
      updateOrder({ checkoutComplete: true }, vnp_OrderInfo).then((res) => {
        console.log("🚀 ~ getOrderAPI ~ res:", res);
      });
    } else if (vnp_ResponseCode === "02") {
      await deleteOrder(vnp_OrderInfo);
    }
    getOrderAPI(vnp_OrderInfo).then((res) => {
      if (!res?.error) setData(res);
    });
  };
  useEffect(() => {
    handleGetOrder();
  }, []);
  return (
    <Box sx={{ bgcolor: (theme) => theme.bgColor }}>
      <Header showHeader={false} />
      <Container sx={{ p: 3, bgcolor: "white", my: 3 }}>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <img
              src={data?.image}
              style={{ width: "300px", height: "300px" }}
            />
          </Box>
          <Typography>Product name: {data?.name}</Typography>
          <Typography>Price: {data?.price}</Typography>
          <Typography>Category: {data?.category}</Typography>
          <Typography>Quantity: {data?.quantity}</Typography>
          <Box>
            {data?.size ? <Typography>Size: {data?.size}</Typography> : ""}
          </Box>
          <Typography>
            Status: {data?.checkoutComplete ? "Complete" : "not complete"}
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            sx={{ bgcolor: (theme) => theme.commonColors }}
            onClick={() => navigate("/homepage")}
          >
            Back to homePage
          </Button>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default CheckoutOrder;
