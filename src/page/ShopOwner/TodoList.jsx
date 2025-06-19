import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrdersAPIReduxById,
  orderSliceSelector,
} from "../../redux/slice/orderSlice";
import { socketIoInstance } from "../../main";
import { userInfoSelector } from "../../redux/slice/userInfoSlice";
import { getOrderByShopId } from "../../api";
import { ORDER_STATUS } from "../../utils/constants";
const TodoList = () => {
  const [listOrdersPending, setListOrderPending] = useState([]);
  const [listOrdersAccept, setListOrderAccept] = useState([]);
  const [listOrdersDelivering, setListOrderDelivering] = useState([]);
  const [listOrdersDone, setListOrderDone] = useState([]);
  const [listOrdersReject, setListOrderReject] = useState([]);

  const userInfo = useSelector(userInfoSelector);
  const dispatch = useDispatch();

  const handleGetListOrder = async () => {
    await getOrderByShopId(userInfo?.shopId).then((res) => {
      setListOrderPending(
        res.filter((item) => {
          return item?.status === ORDER_STATUS.PENDING;
        })
      );
      setListOrderAccept(
        res.filter((item) => {
          return item?.status === ORDER_STATUS.ACCEPTED;
        })
      );
      setListOrderDelivering(
        res.filter((item) => {
          return item?.status === ORDER_STATUS.DELIVERING;
        })
      );
      setListOrderDone(
        res.filter((item) => {
          return item?.status === ORDER_STATUS.DONE;
        })
      );
      setListOrderReject(
        res.filter((item) => {
          return item?.status === ORDER_STATUS.REJECTED;
        })
      );
    });
  };
  const dataTest = [
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
      title: "Đơn trả hàng/hoàn tiền",
    },
  ];
  useEffect(() => {
    handleGetListOrder();
    const ReceiveEmitFormBackEnd = async (dataToEmit) => {
      if (dataToEmit?.shopId === userInfo?.shopId) {
        dispatch(getOrdersAPIReduxById(dataToEmit?.shopId)).then((res) => {
          setListOrderPending(
            res.payload?.filter((item) => {
              return item?.status === ORDER_STATUS.PENDING;
            })
          );
          setListOrderAccept(
            res.filter((item) => {
              return item?.status === ORDER_STATUS.ACCEPTED;
            })
          );
          setListOrderDelivering(
            res.filter((item) => {
              return item?.status === ORDER_STATUS.DELIVERING;
            })
          );
          setListOrderDone(
            res.filter((item) => {
              return item?.status === ORDER_STATUS.DONE;
            })
          );
          setListOrderReject(
            res.filter((item) => {
              return item?.status === ORDER_STATUS.REJECTED;
            })
          );
        });
      }
    };
    socketIoInstance.removeAllListeners(
      `user_place_an_order_be_${userInfo?.shopId}`
    );
    socketIoInstance.on(
      `user_place_an_order_be_${userInfo?.shopId}`,
      ReceiveEmitFormBackEnd
    );
    return () => {
      socketIoInstance.off(
        `user_place_an_order_be_${userInfo?.shopId}`,
        ReceiveEmitFormBackEnd
      );
    };
  }, []);
  return (
    <Box sx={{ mt: 3, bgcolor: (theme) => theme.whiteColor, p: 3 }}>
      <Box sx={{ mb: 5, color: "black" }}>
        <Typography variant="h5"> Danh sách cần làm</Typography>
        <Typography sx={{ color: "#757575" }}>
          Những việc bạn sẽ phải làm
        </Typography>
      </Box>
      <Grid container spacing={5}>
        <Grid
          size={{ lg: 3, md: 3, sm: 4, xs: 6 }}
          sx={{
            border: "3px solid #fa5130",
            borderRadius: "5px",
            p: 5,
            textAlign: "center",
            color: "black",
          }}
          // onClick={() => handleGetDetailOrder}
        >
          <Typography sx={{ fontSize: "20px" }}>
            {listOrdersPending?.length}
          </Typography>
          <Typography> Đơn chờ xác nhận</Typography>
        </Grid>

        <Grid
          size={{ lg: 3, md: 3, sm: 4, xs: 6 }}
          sx={{
            border: "3px solid #fa5130",
            borderRadius: "5px",
            p: 5,
            textAlign: "center",
            color: "black",
          }}
        >
          <Typography sx={{ fontSize: "20px" }}>
            {listOrdersAccept?.length}
          </Typography>
          <Typography>Đơn đã xác nhận</Typography>
        </Grid>

        <Grid
          size={{ lg: 3, md: 3, sm: 4, xs: 6 }}
          sx={{
            border: "3px solid #fa5130",
            borderRadius: "5px",
            p: 5,
            textAlign: "center",
            color: "black",
          }}
        >
          <Typography sx={{ fontSize: "20px" }}>
            {listOrdersDelivering?.length}
          </Typography>
          <Typography>Đơn đang giao</Typography>
        </Grid>

        <Grid
          size={{ lg: 3, md: 3, sm: 4, xs: 6 }}
          sx={{
            border: "3px solid #fa5130",
            borderRadius: "5px",
            p: 5,
            textAlign: "center",
            color: "black",
          }}
        >
          <Typography sx={{ fontSize: "20px" }}>
            {listOrdersReject?.length}
          </Typography>
          <Typography> Đơn đã huỷ</Typography>
        </Grid>
        <Grid
          size={{ lg: 3, md: 3, sm: 4, xs: 6 }}
          sx={{
            border: "3px solid #fa5130",
            borderRadius: "5px",
            p: 5,
            textAlign: "center",
            color: "black",
          }}
        >
          <Typography sx={{ fontSize: "20px" }}>
            {listOrdersDone?.length}
          </Typography>
          <Typography> Đơn đã giao</Typography>
        </Grid>
        <Grid
          size={{ lg: 3, md: 3, sm: 4, xs: 6 }}
          sx={{
            border: "3px solid #fa5130",
            borderRadius: "5px",
            p: 5,
            textAlign: "center",
            color: "black",
          }}
        >
          <Typography sx={{ fontSize: "20px" }}> 1</Typography>
          <Typography> chưa biết ghi gì</Typography>
        </Grid>
        <Grid
          size={{ lg: 3, md: 3, sm: 4, xs: 6 }}
          sx={{
            border: "3px solid #fa5130",
            borderRadius: "5px",
            p: 5,
            textAlign: "center",
            color: "black",
          }}
        >
          <Typography sx={{ fontSize: "20px" }}> 1</Typography>
          <Typography> chưa biết ghi gì</Typography>
        </Grid>
        <Grid
          size={{ lg: 3, md: 3, sm: 4, xs: 6 }}
          sx={{
            border: "3px solid #fa5130",
            borderRadius: "5px",
            p: 5,
            textAlign: "center",
            color: "black",
          }}
        >
          <Typography sx={{ fontSize: "20px" }}> 1</Typography>
          <Typography> chưa biết ghi gì</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TodoList;
