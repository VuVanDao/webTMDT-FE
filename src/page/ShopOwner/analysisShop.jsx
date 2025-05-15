import { Box, Typography } from "@mui/material";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const AnalysisShop = () => {
  const data = [
    {
      name: "Page A",
      uv: 400,
      pv: 240,
      amt: 9400,
    },
    {
      name: "Page B",
      uv: 300,
      pv: 139,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 200,
      pv: 980,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 278,
      pv: 390,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 189,
      pv: 480,
      amt: 2181,
    },
  ];
  // Lấy ngày hôm nay
  const today = new Date();

  // Định dạng giờ theo GMT+7
  const options = {
    timeZone: "Asia/Ho_Chi_Minh", // GMT+7
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat("vi-VN", options);
  const formattedTime = formatter.format(today);

  // Chuỗi kết quả
  const result = `( Hôm nay 00:00 GMT+7 ${formattedTime} )`;
  return (
    <Box
      sx={{
        my: 3,
        bgcolor: (theme) => theme.whiteColor,
        p: 3,
      }}
    >
      <Box mb={5}>
        <Typography variant="h5">Phân tích bán hàng</Typography>
        <Typography fontSize={"12px"}>{result}</Typography>
      </Box>

      <ResponsiveContainer width="50%" height={300}>
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default AnalysisShop;
