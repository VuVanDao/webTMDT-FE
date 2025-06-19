import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ORDER_STATUS } from "../../../utils/constants";
import { Box, Button, Divider, Typography } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { formatPrice } from "../../../utils/formatter";
import { userInfoSelector } from "../../../redux/slice/userInfoSlice";
import { getOrderByShopId, updateOrder } from "../../../api";
import { ModalShopRejectOrder } from "./ModalShopRejectOrder";
import { toast } from "react-toastify";
const RejectShopOrder = () => {
  const [listOrderRejected, setListOrderRejected] = useState([]);
  const [openRejectOrder, setOpenRejectOrder] = useState(false);
  const [item, setItem] = useState(false);
  const userInfo = useSelector(userInfoSelector);

  const handleGetPendingOrder = async () => {
    await getOrderByShopId(userInfo?.shopId).then((res) => {
      setListOrderRejected(
        res?.filter((item) => {
          return item?.status === ORDER_STATUS.REJECTED;
        })
      );
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

  const handleDeleteFromShopOrder = async (item) => {
    if (item) {
      await deleteOrder(item?._id).then((res) => {
        if (res?.deletedCount >= 1) {
          toast.success("Thao tác thành công");
          handleGetAllShopOrder();
        }
      });
    }
  };
  useEffect(() => {
    handleGetPendingOrder();
  }, []);
  return (
    <Box>
      {listOrderRejected?.length === 0 && (
        <Box>
          <Typography>Hiện chưa có đơn hàng nào</Typography>
        </Box>
      )}
      {listOrderRejected?.map((item) => {
        return (
          <Box key={item?._id} mb={5} sx={{ border: "1px solid black" }} p={2}>
            {/* tieu de */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {/* left */}
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

              {/* right */}
              <Box sx={{ display: "flex", gap: 1, p: 1, alignItems: "center" }}>
                <Typography
                  sx={{
                    color: "red",
                    display: "flex",
                    alignItems: "center",
                    px: 1,
                  }}
                  variant="caption"
                >
                  <LocalShippingIcon />
                </Typography>

                <Typography variant="button" color="red">
                  Đã hủy đơn
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.12)" }} />

            <Box p={1} sx={{ display: "flex" }}>
              {/* thong tin chi tiet */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {/* anh */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 5,
                    alignItems: "center",
                    width: "100%",
                  }}
                >
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

            <Box
              sx={{ display: "flex", mt: 1, justifyContent: "space-between" }}
            >
              <Box sx={{ display: "flex", gap: 1, p: 1, alignItems: "center" }}>
                <Typography>Khách hàng:</Typography>
                <Typography>{item?.customerInfo?.username}</Typography>
              </Box>
              <Box>
                <Box>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: (theme) => theme.commonColors,
                      color: "white",
                    }}
                    onClick={() => handleDeleteFromShopOrder(item)}
                  >
                    Xoá khỏi danh sách
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        );
      })}
      <ModalShopRejectOrder
        openRejectOrder={openRejectOrder}
        handleRejectOrder={handleRejectOrder}
        item={item}
      />
    </Box>
  );
};

export default RejectShopOrder;
