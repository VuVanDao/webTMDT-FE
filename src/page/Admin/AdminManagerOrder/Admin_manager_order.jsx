import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getOderByAdmin } from "../../../api";
import { formatPrice } from "../../../utils/formatter";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Admin_manager_order = () => {
  const [orders, setOrders] = useState([]);
  const [change, setChange] = useState({
    shop: false,
    customer: false,
    product: false,
    price: false,
    quantity: false,
    status: false,
    createdAt: false,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleGetAllOrder = async () => {
    await getOderByAdmin().then((res) => {
      if (res && !res?.error) {
        setOrders(res);
      }
    });
  };
  const handleSort = (type) => {
    switch (type) {
      case "shop":
        setOrders(
          orders.sort((a, b) =>
            a.ShopInfo[0]?.name.localeCompare(b.ShopInfo[0]?.name)
          )
        );
        setChange({ ...change, shop: !change.shop });
        break;
      case "shopReverse":
        setOrders(
          orders.sort((a, b) =>
            b.ShopInfo[0]?.name.localeCompare(a.ShopInfo[0]?.name)
          )
        );
        setChange({ ...change, shop: !change.shop });
        break;

      case "customer":
        setOrders(
          orders.sort((a, b) =>
            a.customerInfo?.username.localeCompare(b.customerInfo?.username)
          )
        );
        setChange({ ...change, customer: !change.customer });
        break;
      case "customerReverse":
        setOrders(
          orders.sort((a, b) =>
            b.customerInfo?.username.localeCompare(a.customerInfo?.username)
          )
        );
        setChange({ ...change, customer: !change.customer });
        break;

      case "product":
        setOrders(orders.sort((a, b) => a.name.localeCompare(b.name)));
        setChange({ ...change, product: !change.product });
        break;
      case "productReverse":
        setOrders(orders.sort((a, b) => b.name.localeCompare(a.name)));
        setChange({ ...change, product: !change.product });
        break;

      case "price":
        setOrders(orders.sort((a, b) => a.price - b.price));
        setChange({ ...change, price: !change.price });
        break;
      case "priceReverse":
        setOrders(orders.sort((a, b) => b.price - a.price));
        setChange({ ...change, price: !change.price });
        break;

      case "quantity":
        setOrders(orders.sort((a, b) => a.quantity - b.quantity));
        setChange({ ...change, quantity: !change.quantity });
        break;
      case "quantityReverse":
        setOrders(orders.sort((a, b) => b.quantity - a.quantity));
        setChange({ ...change, quantity: !change.quantity });
        break;

      case "status":
        setOrders(orders.sort((a, b) => a.status.localeCompare(b.status)));
        setChange({ ...change, status: !change.status });
        break;
      case "statusReverse":
        setOrders(orders.sort((a, b) => b.status.localeCompare(a.status)));
        setChange({ ...change, status: !change.status });
        break;

      case "createdAt":
        setOrders(orders.sort((a, b) => a.createdAt - b.createdAt));
        setChange({ ...change, createdAt: !change.createdAt });
        break;
      case "createdAtReverse":
        setOrders(orders.sort((a, b) => b.createdAt - a.createdAt));
        setChange({ ...change, createdAt: !change.createdAt });
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    handleGetAllOrder();
  }, []);

  return (
    <Box
      sx={{
        m: 3,
        bgcolor: (theme) => theme.whiteColor,
        p: { xs: 1, sm: 3 },
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ cursor: "pointer" }}>
            {/* Shop */}
            <TableCell>
              {!change?.shop ? (
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  onClick={() => handleSort("shop")}
                >
                  Shop
                  <ArrowDropUpIcon />
                </Typography>
              ) : (
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  onClick={() => handleSort("shopReverse")}
                >
                  Shop
                  <ArrowDropDownIcon />
                </Typography>
              )}
            </TableCell>

            {/* Customer */}
            <TableCell>
              {!change?.customer ? (
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  onClick={() => handleSort("customer")}
                >
                  Khách hàng
                  <ArrowDropUpIcon />
                </Typography>
              ) : (
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  onClick={() => handleSort("customerReverse")}
                >
                  Khách hàng
                  <ArrowDropDownIcon />
                </Typography>
              )}
            </TableCell>

            {/* Product */}
            <TableCell>
              {!change?.product ? (
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  onClick={() => handleSort("product")}
                >
                  Sản phẩm
                  <ArrowDropUpIcon />
                </Typography>
              ) : (
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  onClick={() => handleSort("productReverse")}
                >
                  Sản phẩm
                  <ArrowDropDownIcon />
                </Typography>
              )}
            </TableCell>

            {/* Price */}
            <TableCell>
              {!change?.price ? (
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  onClick={() => handleSort("price")}
                >
                  Giá cả
                  <ArrowDropUpIcon />
                </Typography>
              ) : (
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  onClick={() => handleSort("priceReverse")}
                >
                  Giá cả
                  <ArrowDropDownIcon />
                </Typography>
              )}
            </TableCell>

            {/* Quantity */}
            <TableCell>
              {!change?.quantity ? (
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  onClick={() => handleSort("quantity")}
                >
                  Số lượng
                  <ArrowDropUpIcon />
                </Typography>
              ) : (
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  onClick={() => handleSort("quantityReverse")}
                >
                  Số lượng
                  <ArrowDropDownIcon />
                </Typography>
              )}
            </TableCell>

            {/* Status */}
            <TableCell>
              {!change?.status ? (
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  onClick={() => handleSort("status")}
                >
                  Trạng thái
                  <ArrowDropUpIcon />
                </Typography>
              ) : (
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  onClick={() => handleSort("statusReverse")}
                >
                  Trạng thái
                  <ArrowDropDownIcon />
                </Typography>
              )}
            </TableCell>

            <TableCell align="center">
              {!change?.createdAt ? (
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  onClick={() => handleSort("createdAt")}
                >
                  Ngày tạo
                  <ArrowDropUpIcon />
                </Typography>
              ) : (
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  onClick={() => handleSort("createdAtReverse")}
                >
                  Ngày tạo
                  <ArrowDropDownIcon />
                </Typography>
              )}
            </TableCell>
            {/* <TableCell>Hành động</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {orders
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((order) => (
              <TableRow key={order._id}>
                <TableCell>
                  <Box>{order.ShopInfo[0]?.name}</Box>
                </TableCell>
                <TableCell>
                  <Box>{order.customerInfo?.username}</Box>
                </TableCell>
                <TableCell sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={order.image}
                    alt={order.name}
                    width={60}
                    height={60}
                    style={{ objectFit: "contain", border: "1px solid black" }}
                  />
                  <Box>{order.name}</Box>
                </TableCell>
                <TableCell>{formatPrice(order.price)}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {order.quantity}
                </TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleString()}
                </TableCell>
                {/* <TableCell>
                  <Button>View</Button>
                </TableCell> */}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={orders?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[12, 18, 24]}
      />
    </Box>
  );
};

export default Admin_manager_order;
