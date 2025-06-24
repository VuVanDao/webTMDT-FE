import { Badge, Box, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { socketIoInstance } from "../../main";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../../redux/slice/userInfoSlice";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import {
  deleteNotification,
  getNotification,
  newNotification,
} from "../../api";
const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [Notification, setNotification] = useState([]);
  const open = Boolean(anchorEl);

  const userInfo = useSelector(userInfoSelector);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleGetNotification = async () => {
    if (!userInfo?._id) {
      return;
    } else {
      await getNotification(userInfo?._id).then((res) => {
        if (!res.error) {
          setNotification(res);
        }
      });
    }
  };
  useEffect(() => {
    handleGetNotification();

    //function xu li su kien realTime
    const ReceiveEmitFormBackEnd = async (dataToEmit) => {
      if (dataToEmit?.customerId === userInfo?._id) {
        await newNotification({
          content: `Đã đặt hàng sản phẩm ${dataToEmit?.name}`,
          ownerNotificationId: userInfo?._id,
        });
        handleGetNotification();
      }
    };
    const ReceiveEmitAcceptedOrderFormBackEnd = async (dataToEmit) => {
      if (dataToEmit?.ownerNotificationId === userInfo?._id) {
        await newNotification(dataToEmit);
        toast.success("Có thông báo mới về đơn hàng của bạn");
        handleGetNotification();
      }
    };
    const ReceiveEmitBrowsedShopFormBackEnd = async (dataToEmit) => {
      if (dataToEmit?.Owner[0]?._id === userInfo?._id) {
        await newNotification({
          content: `Đã duyệt mở cửa hàng ${dataToEmit?.name}`,
          ownerNotificationId: dataToEmit?.Owner[0]?._id,
        });
        toast.success("Có thông báo mới về đơn hàng của bạn");
        handleGetNotification();
      }
    };
    socketIoInstance.removeAllListeners(
      `notification_place_order_from_be_${userInfo?._id}`
    );
    socketIoInstance.on(
      `notification_place_order_from_be_${userInfo?._id}`,
      ReceiveEmitFormBackEnd
    );

    //accepted order
    socketIoInstance.removeAllListeners(
      `accept_delivery_order_from_be_${userInfo?._id}`
    );
    socketIoInstance.on(
      `accept_delivery_order_from_be_${userInfo?._id}`,
      ReceiveEmitAcceptedOrderFormBackEnd
    );

    //browsed shop
    socketIoInstance.removeAllListeners(
      `admin_browse_shop_from_be_${userInfo?._id}`
    );
    socketIoInstance.on(
      `admin_browse_shop_from_be_${userInfo?._id}`,
      ReceiveEmitAcceptedOrderFormBackEnd
    );
    return () => {
      socketIoInstance.off(
        `notification_place_order_from_be_${userInfo?._id}`,
        ReceiveEmitFormBackEnd
      );

      //accepted order
      socketIoInstance.off(
        `accept_delivery_order_from_be_${userInfo?._id}`,
        ReceiveEmitAcceptedOrderFormBackEnd
      );

      //browsed shop
      socketIoInstance.off(
        `admin_browse_shop_from_be_${userInfo?._id}`,
        ReceiveEmitBrowsedShopFormBackEnd
      );
    };
  }, []);

  const handleConfirm = async (notificationId) => {
    await deleteNotification(notificationId).then((res) => {
      if (!res.error) {
        handleGetNotification();
      }
    });
  };
  return (
    <Box sx={{ cursor: "pointer" }}>
      <Tooltip
        title={"Notifications"}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "white", p: "0" }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Badge badgeContent={Notification?.length}>
            <NotificationsNoneIcon />
            <Typography>Thông báo</Typography>
          </Badge>
        </Box>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {Notification?.length === 0 ? (
          <Box sx={{ p: 1 }}>Không có thông báo mới nào</Box>
        ) : (
          Notification?.map((item) => (
            <MenuItem key={item?._id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  maxWidth: "300px",
                }}
              >
                <Typography
                  sx={{
                    maxWidth: "70%",
                    overflowX: "hidden",
                    fontSize: "14px",
                  }}
                >
                  {item?.content}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: (theme) => theme.commonColors,
                  }}
                  onClick={() => handleConfirm(item?._id)}
                >
                  Xác nhận
                </Typography>
              </Box>
            </MenuItem>
          ))
        )}
      </Menu>
    </Box>
  );
};

export default Notification;
