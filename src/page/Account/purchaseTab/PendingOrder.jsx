import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ORDER_STATUS } from "../../../utils/constants";
import { Box, Button, Divider, Typography } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { formatPrice } from "../../../utils/formatter";
import { userInfoSelector } from "../../../redux/slice/userInfoSlice";
import { getOderByStatus } from "../../../api";
import { ModalRejectOrder } from "./ModalRejectOrder";
import { useNavigate } from "react-router-dom";
const PendingOrder = () => {
  const [listOrderPending, setListOrderPending] = useState([]);
  const [openRejectOrder, setOpenRejectOrder] = useState(false);
  const [item, setItem] = useState(false);
  const userInfo = useSelector(userInfoSelector);
  const navigate = useNavigate();
  const handleGetPendingOrder = async () => {
    const data = {
      statusOrder: ORDER_STATUS.PENDING,
      customerId: userInfo?._id,
    };
    await getOderByStatus(data).then((res) => {
      setListOrderPending(res);
    });
  };
  const handleRejectOrder = (item) => {
    if (item) {
      setItem(item);
    }
    if (item === true) {
      handleGetPendingOrder();
    }
    setOpenRejectOrder(!openRejectOrder);
  };
  useEffect(() => {
    handleGetPendingOrder();
  }, []);
  return (
    <Box>
      {listOrderPending?.length === 0 && (
        <Box>
          <Typography>Hiện chưa có đơn hàng nào</Typography>
        </Box>
      )}
      {listOrderPending?.map((item) => {
        return (
          <Box key={item?._id} mb={5} sx={{ border: "1px solid black" }} p={2}>
            {/* tieu de */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {/* right */}
              <Box sx={{ display: "flex", gap: 1, p: 1, alignItems: "center" }}>
                <Typography
                  sx={{
                    bgcolor: (theme) => theme.commonColors,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    px: 1,
                  }}
                  variant="caption"
                >
                  Yêu thích +
                </Typography>

                <Typography variant="button" color="black">
                  {item?.ShopInfo[0].name}
                </Typography>

                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<StorefrontIcon />}
                  sx={{ borderColor: "rgba(0, 0, 0, .09)", color: "#555" }}
                  onClick={() =>
                    navigate(`/check_shop_detail?id=${item?.ShopInfo[0]?._id}`)
                  }
                >
                  Xem Shop
                </Button>
              </Box>

              {/* left */}
              <Box sx={{ display: "flex", gap: 1, p: 1, alignItems: "center" }}>
                <Typography
                  sx={{
                    color: "#00bfa5",
                    display: "flex",
                    alignItems: "center",
                    px: 1,
                  }}
                  variant="caption"
                >
                  <LocalShippingIcon />
                </Typography>

                <Typography variant="button" color="#00bfa5">
                  Đang chờ phản hồi
                </Typography>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  sx={{ bgcolor: "#555", height: "15px" }}
                />
                <Typography color="black">Đánh giá</Typography>
              </Box>
            </Box>

            <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.12)" }} />

            <Box p={1} sx={{ display: "flex" }}>
              {/* thong tinn chi tiet */}
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                {/* anh */}
                <img
                  src={item?.image}
                  style={{ width: "80px", border: "1px solid" }}
                />

                {/* ten, loai, kich co ,so luong */}
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}
                >
                  <Typography
                    sx={{
                      maxWidth: "75%",
                      overflow: "hidden",
                      lineHeight: "20px",
                    }}
                    variant="subtitle1"
                    color="black"
                  >
                    {item?.name}
                  </Typography>
                  <Typography color="rgba(0, 0, 0, .54)" variant="body2">
                    Phân loại hàng: {item?.category}{" "}
                    {item?.size ? `kích cỡ: ${item?.size}` : ""}
                  </Typography>
                  <Typography variant="subtitle1" color="black">
                    số lượng: {item?.quantity}
                  </Typography>
                </Box>

                {/* price */}
                <Box color={"black"}>{formatPrice(item?.price)}</Box>
              </Box>
            </Box>

            <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.12)" }} />

            <Box sx={{ textAlign: "end", mt: 1 }}>
              <Button
                sx={{ bgcolor: (theme) => theme.commonColors, color: "white" }}
                variant="contained"
                onClick={() => handleRejectOrder(item)}
              >
                Huỷ đơn
              </Button>
            </Box>
          </Box>
        );
      })}
      <ModalRejectOrder
        openRejectOrder={openRejectOrder}
        handleRejectOrder={handleRejectOrder}
        item={item}
      />
    </Box>
  );
};

export default PendingOrder;
