import React, { useState } from "react";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Container,
} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ShopOwnerHeader from "../ShopOwner/ShopOwnerHeader";
import Footer from "../../components/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
const AdminPage = () => {
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
    {
      label: "Quản lí shop",
      icon: "ShoppingCart",
      children: [
        { id: 1, title: "Duyệt đăng kí", link: "/admin/admin_browser_shop" },
        { id: 2, title: "Quản lí shop", link: "/admin/admin_manage_shop" },
        {
          id: 3,
          title: "Quản lí danh mục",
          link: "/admin/admin_manage_category",
        },
        {
          id: 4,
          title: "Quản lí các đơn hàng",
          link: "/admin/admin_manage_order",
        },
      ],
    },
    {
      label: "Tài khoản",
      icon: "SupervisedUserCircle",
      children: [
        {
          id: 1,
          title: "Danh sách tài khoản",
          link: "/admin/admin_manage_account",
        },
      ],
    },
    {
      label: "Thương hiệu",
      icon: "CatchingPokemon",
      children: [
        {
          id: 1,
          title: "Danh sách các thương hiệu",
          link: "/admin/admin_manage_brands",
        },
      ],
    },
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
      <AdminHeader toggleDrawer={toggleDrawer} myShopHeader={true} />

      <Box>
        <Outlet />
      </Box>

      <Drawer open={open} onClose={toggleDrawer(false)} variant="temporary">
        {DrawerList}
      </Drawer>
      <Footer />
    </Box>
  );
};
export default AdminPage;
