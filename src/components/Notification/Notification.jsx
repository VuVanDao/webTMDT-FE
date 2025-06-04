import { Badge, Box, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { socketIoInstance } from "../../main";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../../redux/slice/userInfoSlice";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { newNotification } from "../../api";
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
  useEffect(() => {
    //function xu li su kien realTime
    const ReceiveEmitFormBackEnd = async (dataToEmit) => {
      if (dataToEmit?.customerId === userInfo?._id) {
        await newNotification({
          content: `Đã đặt hàng sản phẩm ${dataToEmit?.name}`,
        });
        toast.info("Có thông báo mới");
      }
    };
    socketIoInstance.removeAllListeners(
      `notification_place_order_from_be_${userInfo?._id}`
    );
    socketIoInstance.on(
      `notification_place_order_from_be_${userInfo?._id}`,
      ReceiveEmitFormBackEnd
    );
    return () => {
      socketIoInstance.off(
        `notification_place_order_from_be_${userInfo?._id}`,
        ReceiveEmitFormBackEnd
      );
    };
  }, []);
  const handleConfirm = (id) => {
    const newNotification = [...Notification];
    setNotification(newNotification.filter((item) => +item.id !== +id));
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
          Notification?.map((item, index) => (
            <MenuItem key={index}>
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
                  {item}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: (theme) => theme.commonColors,
                  }}
                  onClick={() => handleConfirm(item?.id)}
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
