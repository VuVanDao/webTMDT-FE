import React, { useEffect, useState } from "react";
import { getOrderByShopId } from "../../../../api";
import { Box, TablePagination, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { formatPrice } from "../../../../utils/formatter";

const List_orders_tab = ({ shopId }) => {
  const [listOrders, setListOrders] = useState([]);
  const [change, setChange] = useState({
    customer: false,
    product: false,
    price: false,
    quantity: false,
    status: false,
    createdAt: false,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Xử lý khi thay đổi trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // Xử lý khi thay đổi số hàng mỗi trang
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSort = (type) => {
    switch (type) {
      case "customer":
        setListOrders(
          listOrders.sort((a, b) =>
            a.customerInfo?.username.localeCompare(b.customerInfo?.username)
          )
        );
        setChange({ ...change, customer: !change.customer });
        break;
      case "customerReverse":
        setListOrders(
          listOrders.sort((a, b) =>
            b.customerInfo?.username.localeCompare(a.customerInfo?.username)
          )
        );
        setChange({ ...change, customer: !change.customer });
        break;

      case "product":
        setListOrders(listOrders.sort((a, b) => a.name.localeCompare(b.name)));
        setChange({ ...change, product: !change.product });
        break;
      case "productReverse":
        setListOrders(listOrders.sort((a, b) => b.name.localeCompare(a.name)));
        setChange({ ...change, product: !change.product });
        break;

      case "price":
        setListOrders(listOrders.sort((a, b) => a.price - b.price));
        setChange({ ...change, price: !change.price });
        break;
      case "priceReverse":
        setListOrders(listOrders.sort((a, b) => b.price - a.price));
        setChange({ ...change, price: !change.price });
        break;

      case "quantity":
        setListOrders(listOrders.sort((a, b) => a.quantity - b.quantity));
        setChange({ ...change, quantity: !change.quantity });
        break;
      case "quantityReverse":
        setListOrders(listOrders.sort((a, b) => b.quantity - a.quantity));
        setChange({ ...change, quantity: !change.quantity });
        break;

      case "status":
        setListOrders(
          listOrders.sort((a, b) => a.status.localeCompare(b.status))
        );
        setChange({ ...change, status: !change.status });
        break;
      case "statusReverse":
        setListOrders(
          listOrders.sort((a, b) => b.status.localeCompare(a.status))
        );
        setChange({ ...change, status: !change.status });
        break;

      case "createdAt":
        setListOrders(listOrders.sort((a, b) => a.createdAt - b.createdAt));
        setChange({ ...change, createdAt: !change.createdAt });
        break;
      case "createdAtReverse":
        setListOrders(listOrders.sort((a, b) => b.createdAt - a.createdAt));
        setChange({ ...change, createdAt: !change.createdAt });
        break;
      default:
        break;
    }
  };
  const handleGetListOrders = () => {
    getOrderByShopId(shopId).then((res) => {
      setListOrders(res);
    });
  };
  useEffect(() => {
    if (shopId) handleGetListOrders();
  }, []);
  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow sx={{ cursor: "pointer" }}>
            {/* Customer */}
            <TableCell>
              {change?.customer ? (
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  onClick={() => handleSort("customer")}
                >
                  Customer
                  <ArrowDropUpIcon />
                </Typography>
              ) : (
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  onClick={() => handleSort("customerReverse")}
                >
                  Customer
                  <ArrowDropDownIcon />
                </Typography>
              )}
            </TableCell>

            {/* Product */}
            <TableCell>
              {!change?.product ? (
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => handleSort("product")}
                >
                  Sản phẩm
                  <ArrowDropUpIcon />
                </Typography>
              ) : (
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
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
                  sx={{ display: "flex", alignItems: "center", width: "80px" }}
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
            <TableCell sx={{ width: "125px" }}>
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
            <TableCell sx={{ width: "150px" }}>
              {!change?.status ? (
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => handleSort("status")}
                >
                  Trạng thái
                  <ArrowDropUpIcon />
                </Typography>
              ) : (
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
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
          {listOrders
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((order) => (
              <TableRow key={order._id}>
                <TableCell sx={{ width: "150px" }}>
                  <Box>{order?.customerInfo?.username}</Box>
                </TableCell>

                <TableCell
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <img
                    src={order.image}
                    alt={order.name}
                    style={{
                      objectFit: "contain",
                      border: "1px solid black",
                      width: "60px",
                      height: "60px",
                    }}
                  />
                  <Box>{order.name}</Box>
                </TableCell>
                <TableCell>{formatPrice(order.price)}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {order.quantity}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {order.status}
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={listOrders?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[3, 5, 7]}
      />
    </Box>
  );
};

export default List_orders_tab;
