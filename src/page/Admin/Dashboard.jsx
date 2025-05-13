import { Box } from "@mui/material";
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

const Dashboard = () => {
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

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ResponsiveContainer width="50%" height="50%">
        <LineChart width={400} height={400} data={data}>
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
          <Line type="monotone" dataKey="amt" stroke="red" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Dashboard;
