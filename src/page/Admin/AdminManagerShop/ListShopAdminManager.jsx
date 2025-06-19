import React, { useEffect, useState } from "react";
import { getAllShopAdminManager } from "../../../api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Avatar,
  Box,
  Button,
  Container,
  TablePagination,
  Tooltip,
} from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { useNavigate } from "react-router-dom";

const ListShopAdminManager = () => {
  const [listShop, setListShop] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  // Xử lý khi thay đổi trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // Xử lý khi thay đổi số hàng mỗi trang
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleGetAllShop = async () => {
    const res = await getAllShopAdminManager();
    if (!res.error) {
      setListShop(res);
    }
  };
  useEffect(() => {
    handleGetAllShop();
  }, []);
  return (
    <Box sx={{ my: 3, bgcolor: (theme) => theme.whiteColor, p: 3, mx: 6 }}>
      <Button
        variant="contained"
        sx={{
          bgcolor: (theme) => theme.commonColors,
          color: "white",
          my: 2,
        }}
        onClick={() => setOpen(!open)}
      >
        Thêm mới
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Logo</TableCell>
              <TableCell align="center">Shop's Name</TableCell>
              <TableCell align="center">Shop's Owner</TableCell>
              <TableCell align="center">Shop's Email</TableCell>
              <TableCell align="center">Shop's PhoneNumber</TableCell>
              <TableCell align="center">Shop's Address</TableCell>
              <TableCell align="center">Shop's Status</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listShop
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item?._id}>
                  <TableCell component="th" scope="row">
                    <Tooltip title="Click to view">
                      <Avatar src={item?.logo} />
                    </Tooltip>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item?.name}
                  </TableCell>
                  <TableCell align="center">
                    {item?.Owner[0]?.username}
                  </TableCell>
                  <TableCell align="center">{item?.email}</TableCell>
                  <TableCell align="center">{item?.phoneNumber}</TableCell>
                  <TableCell align="center" sx={{ width: "180px" }}>
                    {item?.address}
                  </TableCell>
                  <TableCell align="center">
                    {item?.status === "accept" && "Đã duyệt"}
                    {item?.status === "denied" && "Đã từ chối"}
                    {item?.status === "pending" && "Đang chờ duyệt"}
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: (theme) => theme.commonColors,
                          color: "white",
                        }}
                        onClick={() =>
                          navigate(`/admin/admin_detail_shop?id=${item?._id}`)
                        }
                        size="small"
                      >
                        chi tiết
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          // handleDeleteAccount(item?._id);
                        }}
                        size="small"
                      >
                        Xoá
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={listShop.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[3, 5, 7]}
      />
      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={() => window.scrollTo(0, 0)}
      >
        <ArrowCircleUpIcon />
      </Button>
    </Box>
  );
};

export default ListShopAdminManager;
