import React, { useState } from "react";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ShopOwnerHeader from "./ShopOwnerHeader";
import Footer from "../../components/Footer";
import { Outlet, useNavigate } from "react-router-dom";
const ShopDetail = () => {
  const [open, setOpen] = React.useState(false);
  const [openMenus, setOpenMenus] = React.useState(false);
  const navigate = useNavigate();
  const toggleDrawer = () => () => {
    setOpen(!open);
  };
  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };
  const handleNavigate = (link) => {
    // console.log("🚀 ~ handleNavigate ~ link:", link);
    navigate(link);
    setOpen(!open);
  };
  const sidebarItems = [
    { label: "Vận chuyển", icon: "LocalShipping" },
    {
      label: "Quản Lý Sản Phẩm",
      icon: "ShoppingCart",
      children: [
        { id: 1, title: "Xem sản phẩm", link: "/shop_detail/getAllProduct" },
        { id: 2, title: "Thêm sản phẩm", link: "/shop_detail/addNewProduct" },
        { id: 3, title: "Chỉnh sửa ", link: "/shop_detail/updateProduct" },
        { id: 4, title: "Xoá sản phẩm", link: "/shop_detail/deleteProduct" },
      ],
    },
    { label: "Quản Lý Đơn Hàng", icon: "Inventory" },
    { label: "Kênh Marketing", icon: "Campaign" },
    { label: "Quản lý khách hàng", icon: "Group" },
    { label: "Tài Chính", icon: "AttachMoney" },
    { label: "Dữ Liệu", icon: "BarChart" },
    { label: "Phát Triển", icon: "Code" },
    { label: "Chăm sóc khách hàng", icon: "SupportAgent" },
    { label: "SBS", icon: "Business" },
    { label: "Quản Lý Shop", icon: "Store" },
    { label: "Thiết Lập Shop", icon: "Settings" },
  ];

  const DrawerList = (
    <List>
      {sidebarItems.map((item) => {
        const Icon = MuiIcons[item.icon] || MuiIcons.HelpOutline;
        return (
          <React.Fragment key={item.label}>
            <ListItemButton onClick={() => toggleMenu(item.label)}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={item.label} />
              {openMenus[item.label] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openMenus[item.label]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item?.children?.map((item, index) => {
                  return (
                    <ListItemButton sx={{ pl: 4 }} key={item?.id}>
                      <ListItemText
                        primary={`${item?.title}`}
                        onClick={() => handleNavigate(item?.link)}
                      />
                    </ListItemButton>
                  );
                })}
              </List>
            </Collapse>
          </React.Fragment>
        );
      })}
    </List>
  );

  return (
    <Box sx={{ bgcolor: (theme) => theme.bgColor, width: "100%" }}>
      <ShopOwnerHeader toggleDrawer={toggleDrawer} myShopHeader={true} />

      <Outlet />

      <Drawer open={open} onClose={toggleDrawer(false)} variant="temporary">
        {DrawerList}
      </Drawer>
      <Footer />
    </Box>
  );
};
export default ShopDetail;
