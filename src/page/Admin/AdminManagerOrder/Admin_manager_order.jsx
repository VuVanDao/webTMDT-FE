import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getOderByAdmin } from "../../../api";
import { formatPrice } from "../../../utils/formatter";

const Admin_manager_order = () => {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
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
  useEffect(() => {
    handleGetAllOrder();
  }, []);
  return (
    <Container
      sx={{
        my: 3,
        bgcolor: (theme) => theme.whiteColor,
        p: { xs: 1, sm: 3 },
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Shop</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((order) => (
              <TableRow key={order._id}>
                <TableCell>
                  <div>{order.ShopInfo[0]?.name}</div>
                </TableCell>
                <TableCell>
                  <div>{order.customerInfo?.username}</div>
                </TableCell>
                <TableCell>
                  <img src={order.image} alt={order.productName} width={60} />
                  <div>{order.productName}</div>
                  <div>
                    Giá: {formatPrice(order.price)} x {order.quantity}
                  </div>
                </TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  {new Date(order.createdAt * 1000).toLocaleString()}
                </TableCell>
                <TableCell>
                  {/* Add action buttons here */}
                  <Button>View</Button>
                </TableCell>
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
    </Container>
  );
};

export default Admin_manager_order;
