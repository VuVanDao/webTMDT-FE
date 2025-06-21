import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { getOderByStatus } from "../../../api";
import { Avatar, Divider } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TablePagination } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { formatPrice } from "../../../utils/formatter";
import { ORDER_STATUS } from "../../../utils/constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: "90vh",
  overflowY: "scroll",
  width: "90vw",
  minWidth: "1300px",
};

export const ModalDetailAccount = ({
  open,
  setOpen,
  handleGetAllAccount,
  infoAccountDetail,
  infoAccount,
}) => {
  const [listOrder, setListOrder] = useState(null);
  const [change, setChange] = useState({
    shop: false,
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
      case "shop":
        setListOrder(
          listOrder.sort((a, b) =>
            a.ShopInfo[0]?.name.localeCompare(b.ShopInfo[0]?.name)
          )
        );
        setChange({ ...change, shop: !change.shop });
        break;
      case "shopReverse":
        setListOrder(
          listOrder.sort((a, b) =>
            b.ShopInfo[0]?.name.localeCompare(a.ShopInfo[0]?.name)
          )
        );
        setChange({ ...change, shop: !change.shop });
        break;

      case "product":
        setListOrder(listOrder.sort((a, b) => a.name.localeCompare(b.name)));
        setChange({ ...change, product: !change.product });
        break;
      case "productReverse":
        setListOrder(listOrder.sort((a, b) => b.name.localeCompare(a.name)));
        setChange({ ...change, product: !change.product });
        break;

      case "price":
        setListOrder(listOrder.sort((a, b) => a.price - b.price));
        setChange({ ...change, price: !change.price });
        break;
      case "priceReverse":
        setListOrder(listOrder.sort((a, b) => b.price - a.price));
        setChange({ ...change, price: !change.price });
        break;

      case "quantity":
        setListOrder(listOrder.sort((a, b) => a.quantity - b.quantity));
        setChange({ ...change, quantity: !change.quantity });
        break;
      case "quantityReverse":
        setListOrder(listOrder.sort((a, b) => b.quantity - a.quantity));
        setChange({ ...change, quantity: !change.quantity });
        break;

      case "status":
        setListOrder(
          listOrder.sort((a, b) => a.status.localeCompare(b.status))
        );
        setChange({ ...change, status: !change.status });
        break;
      case "statusReverse":
        setListOrder(
          listOrder.sort((a, b) => b.status.localeCompare(a.status))
        );
        setChange({ ...change, status: !change.status });
        break;

      case "createdAt":
        setListOrder(listOrder.sort((a, b) => a.createdAt - b.createdAt));
        setChange({ ...change, createdAt: !change.createdAt });
        break;
      case "createdAtReverse":
        setListOrder(listOrder.sort((a, b) => b.createdAt - a.createdAt));
        setChange({ ...change, createdAt: !change.createdAt });
        break;
      default:
        break;
    }
  };
  const handleClose = () => {
    setOpen(!open);
    // handleGetAllAccount();
  };
  const handleGetTotalPrice = () => {
    let totalPrice = 0;
    listOrder?.map((order) => {
      if (order.status === ORDER_STATUS.DONE) {
        totalPrice += order.price;
      }
    });
    return totalPrice;
  };
  useEffect(() => {
    const data = {
      statusOrder: "All",
      customerId: infoAccountDetail,
    };
    if (infoAccountDetail) {
      getOderByStatus(data).then((res) => {
        setListOrder(res);
      });
    }
  }, [infoAccountDetail, infoAccount]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Avatar
                src={infoAccount?.avatar}
                alt={infoAccount?.username}
                sx={{
                  width: "150px",
                  height: "150px",
                }}
              />
              <Box>
                <Typography variant="h6">
                  Tên tài khoản: {infoAccount?.username}
                </Typography>
                <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                  <Box>
                    <Typography>Email: {infoAccount?.email}</Typography>
                    <Typography>
                      Số điện thoại: {infoAccount?.phoneNumber}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography>Role: {infoAccount?.role}</Typography>
                    <Typography>Địa chỉ: {infoAccount?.address}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              Tổng số tiền đã giao dịch:
              <Typography variant="h6">
                {formatPrice(handleGetTotalPrice())}
              </Typography>
            </Box>
            <Typography variant="h6">Danh sách đơn hàng</Typography>
            <Table>
              <TableHead>
                <TableRow sx={{ cursor: "pointer" }}>
                  {/* Shop */}
                  <TableCell>
                    {change?.shop ? (
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
                  <TableCell sx={{ width: "150px" }}>
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
                {listOrder
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => (
                    <TableRow key={order._id}>
                      <TableCell sx={{ width: "200px" }}>
                        <Box>{order.ShopInfo[0]?.name}</Box>
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
                      <TableCell>{order.status}</TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={listOrder?.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[3, 5, 7]}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
