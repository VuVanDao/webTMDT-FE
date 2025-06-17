import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ORDER_STATUS } from "../../../utils/constants";
import { Box, Button, Divider, Typography } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { formatPrice } from "../../../utils/formatter";
import { userInfoSelector } from "../../../redux/slice/userInfoSlice";
import {
  deleteOrder,
  getOderByStatus,
  update,
  updateOrder,
} from "../../../api";
import { ModalRejectOrder } from "./ModalRejectOrder";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const DeliveringOrder = () => {
  const [listOrderDelivering, setListOrderDelivering] = useState([]);
  const userInfo = useSelector(userInfoSelector);

  const handleGetAllShopOrder = async () => {
    const data = {
      statusOrder: ORDER_STATUS.DELIVERING,
      customerId: userInfo?._id,
    };
    await getOderByStatus(data).then((res) => {
      setListOrderDelivering(res);
    });
  };
  const handleReceiveOrder = async (item) => {
    if (item) {
      await updateOrder(
        {
          status: "DONE",
          textMessage: "Đơn hàng đã được giao",
        },
        item?._id
      ).then((res) => {
        if (!res.error) {
          toast.success("Thao tác thành công");
        }
      });

      handleGetAllShopOrder();
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    handleGetAllShopOrder();
  }, []);
  return (
    <Box>
      {listOrderDelivering?.length === 0 && (
        <Box>
          <Typography>Hiện chưa có đơn hàng nào</Typography>
        </Box>
      )}
      {listOrderDelivering?.map((item) => {
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
                  Đang trên đường đến với bạn
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.12)" }} />

            <Box p={1} sx={{ display: "flex" }}>
              {/* thong tinn chi tiet */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 5,
                    alignItems: "center",
                    width: "100%",
                  }}
                >
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
                </Box>

                {/* price */}
                <Box color={"black"}>{formatPrice(item?.price)}</Box>
              </Box>
            </Box>

            <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.12)" }} />

            <Box sx={{ textAlign: "end", mt: 1 }}>
              <Button
                sx={{
                  bgcolor: (theme) => theme.commonColors,
                  color: "white",
                  mr: 2,
                }}
                variant="contained"
                onClick={() => handleReceiveOrder(item)}
              >
                Đã nhận được hàng
              </Button>
              <Button
                sx={{ bgcolor: (theme) => theme.commonColors, color: "white" }}
                variant="contained"
                onClick={() => navigate(`/detail/?id=${item?.productId}`)}
              >
                Mua lại
              </Button>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default DeliveringOrder;
