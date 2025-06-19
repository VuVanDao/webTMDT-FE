import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
} from "recharts";
import { getOrderByShopId } from "../../api";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../../redux/slice/userInfoSlice";
import _ from "lodash";
import { ORDER_STATUS } from "../../utils/constants";
const AnalysisShop = () => {
  const [listShopOrder, setListShopOrder] = useState([]);
  const [data, setData] = useState([]);
  const [dataPie, setDataPie] = useState([]);
  const userInfo = useSelector(userInfoSelector);

  const getFormatToday = () => {
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
    return result;
  };

  const FormatDayInOrder = (day) => {
    const timestamp = day;
    const date = new Date(timestamp);

    // Mảng các thứ trong tuần: 0 (Chủ Nhật) đến 6 (Thứ 7)
    const weekdays = [
      "Chủ Nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];

    // Lấy thứ
    let weekday = weekdays[date.getDay()];

    new Date(day).setDate(new Date(day).getDate() - 1);
    // Format: YYYY-MM-DD
    const formatted = new Date(day).toISOString().split("T")[0];
    weekday = `${weekdays[new Date(day).getDay()]}/${formatted}`;

    return weekday;
  };

  //lấy 7 ngay truoc tinh tu hom nay
  const getDays = () => {
    const days = [];
    const today = new Date();
    const dayNames = [
      "Chủ nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      // Format: YYYY-MM-DD
      const formatted = date.toISOString().split("T")[0];
      days.push({
        name: `${dayNames[date.getDay()]}/${formatted}`,
        doneOrder: 0,
        price: 0,
      });
    }

    console.log("🚀 ~ getDays ~ days:", days);
    let listShopOrderClone = _.cloneDeep(listShopOrder);

    listShopOrderClone.map((item) => {
      item?.updatedAt;
      for (let day of days) {
        if (item?.updatedAt === day.name) {
          day.doneOrder++;
          day.price += item?.price;
        }
      }
    });
    setData(days.reverse());
  };
  const setupDataPie = () => {
    let listShopOrderClone = _.cloneDeep(listShopOrder);
    let dataForDataPie = [];
    listShopOrderClone.map((item) =>
      dataForDataPie.find((i) => i.name === item?.status)
        ? dataForDataPie.find((i) => i.name === item?.status).value++
        : dataForDataPie.push({
            name: item?.status,
            value: 1,
          })
    );
    console.log("🚀 ~ setupDataPie ~ dataForDataPie:", dataForDataPie);
    setDataPie(dataForDataPie);
  };
  const handleGetAllShopOrder = async () => {
    await getOrderByShopId(userInfo?.shopId).then((res) => {
      if (res && !res?.error) {
        res.map((item) => {
          item.updatedAt = FormatDayInOrder(item?.updatedAt);
        });
        setListShopOrder(res);
      }
    });
  };

  useEffect(() => {
    handleGetAllShopOrder();
  }, []);
  useEffect(() => {
    if (listShopOrder.length > 0) {
      getDays();
      setupDataPie();
    }
  }, [listShopOrder]);

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
        <Typography fontSize={"12px"}>{getFormatToday()}</Typography>
      </Box>
      <Box>
        <Typography variant="h6">Tổng số đơn hàng</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={dataPie}
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      <Box>
        <Typography variant="h6">Những đơn hàng đã được hoàn thành</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart width={150} height={40} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickFormatter={(value) => value.split("/")[0]}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="doneOrder" fill="#8884d8" name="Đơn hàng hoàn tất" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Box>
        <Typography variant="h6">Tổng doanh thu</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickFormatter={(value) => value.split("/")[0]}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#82ca9d"
              name="Doanh thu"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default AnalysisShop;
