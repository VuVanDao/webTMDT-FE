import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ORDER_STATUS } from "../../../utils/constants";
import { Box, Button, Divider, Typography } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { formatPrice } from "../../../utils/formatter";
import { userInfoSelector } from "../../../redux/slice/userInfoSlice";
import { getOderByStatus } from "../../../api";
import { useNavigate } from "react-router-dom";
import { ModalEvaluateProduct } from "./ModalEvaluateProduct";
const DoneOrder = () => {
  const [listOrderDone, setListOrderDone] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemToEvaluate, setItemToEvaluate] = useState("");

  const userInfo = useSelector(userInfoSelector);
  const navigate = useNavigate();

  const handleGetAllShopOrder = async () => {
    const data = {
      statusOrder: ORDER_STATUS.DONE,
      customerId: userInfo?._id,
    };
    await getOderByStatus(data).then((res) => {
      setListOrderDone(res);
    });
  };
  const handleEvaluateProduct = async (item) => {
    if (item) {
      setItemToEvaluate(item);
      setOpen(!open);
    }
  };
  useEffect(() => {
    handleGetAllShopOrder();
  }, []);
  return (
    <Box>
      {listOrderDone?.length === 0 && (
        <Box>
          <Typography>Hiện chưa có đơn hàng nào</Typography>
        </Box>
      )}
      {listOrderDone?.map((item) => {
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
                  Đơn hàng đã được giao
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
                onClick={() => handleEvaluateProduct(item)}
              >
                đánh giá
              </Button>
              <Button
                sx={{
                  bgcolor: (theme) => theme.commonColors,
                  color: "white",
                  mr: 2,
                }}
                variant="contained"
                onClick={() => navigate(`/detail/?id=${item?.productId}`)}
              >
                Mua lại
              </Button>
              <Button
                sx={{
                  bgcolor: (theme) => theme.commonColors,
                  color: "white",
                }}
                variant="contained"
                onClick={() => navigate(`/detail/?id=${item?.productId}`)}
              >
                Yêu cầu trả hàng / hoàn tiền
              </Button>
            </Box>
          </Box>
        );
      })}
      <ModalEvaluateProduct
        open={open}
        setOpen={setOpen}
        itemToEvaluate={itemToEvaluate}
        handleGetAllShopOrder={handleGetAllShopOrder}
      />
    </Box>
  );
};

export default DoneOrder;
