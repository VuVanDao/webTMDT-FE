import { Box, Container } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import React, { useEffect, useState } from "react";

import { Link, Outlet, useLocation } from "react-router-dom";

const ListOrders = () => {
  const UrlAvailable = {
    allOrder: "/shop_detail/orders/all_order",
    pendingOrder: "/shop_detail/orders/pending_order",
    deliveringOrder: "/shop_detail/orders/delivering_order",
    doneOrder: "/shop_detail/orders/done_order",
    rejectOrder: "/shop_detail/orders/reject_order",
    acceptedOrder: "/shop_detail/orders/accepted_order",
  };
  const location = useLocation();
  const defaultActiveURL = () => {
    let activeUrl = UrlAvailable.allOrder;
    Object.values(UrlAvailable).forEach((url) => {
      if (location.pathname.includes(url)) {
        activeUrl = url;
      }
    });
    return activeUrl;
  };
  const [value, setValue] = useState(defaultActiveURL());

  useEffect(() => {}, [location?.pathname]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container sx={{ my: 2 }}>
      <Box
        sx={{
          width: "100%",
          typography: "body1",
          bgcolor: "white",
          boxShadow: "0 0 .8125rem 0 rgba(0, 0, 0, .05)",
          p: "20px 30px",
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              sx={{
                "& .MuiTabs-indicator": {
                  bgcolor: "red",
                },
                "& .MuiButtonBase-root": {
                  color: "black",
                },
                "& .MuiButtonBase-root.Mui-selected": {
                  color: "red",
                },
              }}
            >
              <Tab
                label="Tất cả"
                value="/shop_detail/orders/all_order"
                component={Link}
                to={`all_order`}
                sx={{ mr: 5 }}
              />

              <Tab
                label="Chờ xác nhận"
                value="/shop_detail/orders/pending_order"
                component={Link}
                to={`pending_order`}
                sx={{ mr: 5 }}
              />
              <Tab
                label="Đang chuẩn bị"
                value="/shop_detail/orders/accepted_order"
                component={Link}
                to={`accepted_order`}
                sx={{ mr: 5 }}
              />
              <Tab
                label="Đang chuyển"
                value="/shop_detail/orders/delivering_order"
                component={Link}
                to={`delivering_order`}
                sx={{ mr: 5 }}
              />
              <Tab
                label="Đã xong"
                value="/shop_detail/orders/done_order"
                component={Link}
                to={`done_order`}
                sx={{ mr: 5 }}
              />
              <Tab
                label="Đã huỷ"
                value="/shop_detail/orders/reject_order"
                component={Link}
                to={`reject_order`}
                sx={{ mr: 5 }}
              />
            </TabList>
          </Box>
        </TabContext>
      </Box>
      <Box
        sx={{
          width: "100%",
          typography: "body1",
          bgcolor: "white",
          boxShadow: "0 0 .8125rem 0 rgba(0, 0, 0, .05)",
          p: "20px 30px",
          mt: 3,
        }}
      >
        <Outlet />
      </Box>
    </Container>
  );
};

export default ListOrders;
