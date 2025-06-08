import { Avatar, Box, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import TextsmsIcon from "@mui/icons-material/Textsms";
import StorefrontIcon from "@mui/icons-material/Storefront";
const ShopOwnerProduct = ({ ShopInfo }) => {
  const [detailShop, setDetailShop] = useState("");

  const handleGetShopEvaluate = () => {
    let result = 0;
    detailShop?.products?.map((item) => {
      result += item?.comments?.length;
    });
    return result;
  };

  useEffect(() => {
    if (ShopInfo) {
      const handleGetDetailShop = () => {
        setDetailShop(ShopInfo);
      };
      handleGetDetailShop();
    }
  }, [ShopInfo]);
  return (
    <Box
      sx={{
        bgcolor: "white",
        color: "black",
        p: 3,
        mt: 2,
        display: "flex",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Avatar src={detailShop?.logo} sx={{ width: "60px", height: "60px" }} />
      <Box sx={{ borderRight: "1px solid rgba(0,0,0,0.5)", pr: 5 }}>
        <Typography>{detailShop?.name}</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 0.5,
          }}
        >
          <Box
            sx={{
              p: "5px 20px",
              border: "1px solid #fa5130",
              borderRadius: "2px",
              cursor: "pointer",
              color: "#fa5130",
              bgcolor: "#ffeee8",
              "&:hover": {
                bgcolor: "rgba(255,245,241,1)",
              },
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <TextsmsIcon fontSize="14px" />
            <Typography>Chat ngay</Typography>
          </Box>
          <Box
            sx={{
              p: "5px 20px",
              borderRadius: "2px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 1,
              border: "1px solid black",
            }}
          >
            <StorefrontIcon fontSize="14px" />
            <Typography>Xem shop</Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <Box sx={{ display: "flex", gap: 5 }}>
          <Typography color="rgba(0,0,0,0.4)">Đánh giá</Typography>
          <Typography color="#fa5130">{handleGetShopEvaluate()}</Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 5, mt: 2 }}>
          <Typography color="rgba(0,0,0,0.4)">Sản phẩm</Typography>
          <Typography color="#fa5130">
            {detailShop?.products?.length}
          </Typography>
        </Box>
      </Box>

      <Box>
        <Box sx={{ display: "flex", gap: 5 }}>
          <Typography color="rgba(0,0,0,0.4)">Tham gia</Typography>
          <Typography color="#fa5130">
            {Math.floor(
              (Date.now() - detailShop?.createdAt) / (1000 * 60 * 60 * 24)
            )}{" "}
            ngày trước
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 5, mt: 2 }}>
          <Typography color="rgba(0,0,0,0.4)">Người theo dõi</Typography>
          <Typography color="#fa5130">
            {/* {detailShop?.products?.length} */}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ShopOwnerProduct;
