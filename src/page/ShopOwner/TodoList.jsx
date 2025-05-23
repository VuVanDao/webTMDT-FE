import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const TodoList = () => {
  const dataTest = [
    {
      num: 1,
      title: "Đơn chờ xác nhận",
    },
    {
      num: 2,
      title: "Đơn chờ lấy hàng",
    },
    {
      num: 3,
      title: "Đã xử lý",
    },
    {
      num: 4,
      title: "Đơn huỷ",
    },
    {
      num: 5,
      title: "Trả hàng/Hoàn tiền chờ xử lý",
    },
    {
      num: 6,
      title: "Sản phẩm bị tạm khoá",
    },
    {
      num: 7,
      title: "Sản phẩm hết hàng",
    },
    {
      num: 8,
      title: "Chương trình khuyến mãi chờ xử lý",
    },
  ];
  return (
    <Box sx={{ mt: 3, bgcolor: (theme) => theme.whiteColor, p: 3 }}>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5"> Danh sách cần làm</Typography>
        <Typography sx={{ color: "#757575" }}>
          Những việc bạn sẽ phải làm
        </Typography>
      </Box>
      <Grid container spacing={5}>
        {dataTest.map((item, index) => {
          return (
            <Grid
              key={index}
              size={{ lg: 3, md: 3, sm: 4, xs: 6 }}
              sx={{
                border: "3px solid #fa5130",
                borderRadius: "5px",
                p: 5,
                textAlign: "center",
              }}
            >
              <Typography sx={{ fontSize: "20px" }}> {item.num}</Typography>
              <Typography> {item.title}</Typography>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default TodoList;
