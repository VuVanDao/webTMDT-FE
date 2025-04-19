import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const SelectOption = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        mt: 2,
        justifyContent: "space-evenly",
      }}
    >
      <Box
        component={Link}
        to="/"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "120px",
          color: "black",
        }}
      >
        <img
          src="https://cf.shopee.vn/file/vn-50009109-5bf65d4dc0eb8f6b42074751e8b736a7_xhdpi"
          style={{ width: "40%" }}
        />
        <Typography
          style={{ width: "60%", fontSize: "14px", textAlign: "center" }}
        >
          Hàng Chọn Giá Hời
        </Typography>
      </Box>

      <Box
        component={Link}
        to="/"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "120px",
          color: "black",
        }}
      >
        <img
          src="https://cf.shopee.vn/file/vn-50009109-8a387d78a7ad954ec489d3ef9abd60b4_xhdpi"
          style={{ width: "40%" }}
        />
        <Typography
          style={{ width: "60%", fontSize: "14px", textAlign: "center" }}
        >
          Mã Giảm Giá
        </Typography>
      </Box>

      <Box
        component={Link}
        to="/"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "120px",
          color: "black",
        }}
      >
        <img
          src="https://cf.shopee.vn/file/vn-50009109-c02353c969d19918c53deaa4ea15bdbe_xhdpi"
          style={{ width: "40%" }}
        />
        <Typography
          style={{ width: "100%", fontSize: "14px", textAlign: "center" }}
        >
          Shoppe Styles Voucher 30%
        </Typography>
      </Box>
      <Box
        component={Link}
        to="/"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "120px",
          color: "black",
        }}
      >
        <img
          src="https://cf.shopee.vn/file/vn-50009109-f6c34d719c3e4d33857371458e7a7059_xhdpi"
          style={{ width: "40%" }}
        />
        <Typography
          style={{ width: "100%", fontSize: "14px", textAlign: "center" }}
        >
          Voucher Giảm Đến 1 triệu
        </Typography>
      </Box>
      <Box
        component={Link}
        to="/"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "120px",
          color: "black",
        }}
      >
        <img
          src="https://cf.shopee.vn/file/a08ab28962514a626195ef0415411585_xhdpi"
          style={{ width: "40%" }}
        />
        <Typography
          style={{ width: "100%", fontSize: "14px", textAlign: "center" }}
        >
          Hàng Quốc tế
        </Typography>
      </Box>
      <Box
        component={Link}
        to="/"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "120px",
          color: "black",
        }}
      >
        <img
          src="https://cf.shopee.vn/file/vn-11134258-7ra0g-m6ow0co1pmqgd6_xhdpi"
          style={{ width: "40%" }}
        />
        <Typography
          style={{ width: "100%", fontSize: "14px", textAlign: "center" }}
        >
          Nạp Thẻ, Dịch Vụ & Hoá Đơn
        </Typography>
      </Box>
    </Box>
  );
};

export default SelectOption;
