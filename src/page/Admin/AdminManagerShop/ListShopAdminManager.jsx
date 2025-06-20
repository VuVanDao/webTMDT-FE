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
  Typography,
} from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { useNavigate } from "react-router-dom";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const ListShopAdminManager = () => {
  const [listShop, setListShop] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const [change, setChange] = useState({
    name: false,
    shopOwner: false,
    shopEmail: false,
    shopAddress: false,
    shopStatus: false,
  });

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
  const handleSort = (type) => {
    switch (type) {
      case "name":
        setListShop(listShop.sort((a, b) => a.name.localeCompare(b.name)));
        setChange({ ...change, name: !change.name });
        break;
      case "nameReverse":
        setListShop(listShop.sort((a, b) => b.name.localeCompare(a.username)));
        setChange({ ...change, name: !change.name });
        break;

      case "shopOwner":
        setListShop(
          listShop.sort((a, b) =>
            a.Owner[0].username.localeCompare(b.Owner[0].username)
          )
        );
        setChange({ ...change, shopOwner: !change.shopOwner });
        break;
      case "shopOwnerReverse":
        setListShop(
          listShop.sort((a, b) =>
            b.Owner[0].username.localeCompare(a.Owner[0].username)
          )
        );
        setChange({ ...change, shopOwner: !change.shopOwner });
        break;

      case "shopEmail":
        setListShop(listShop.sort((a, b) => a.email.localeCompare(b.email)));
        setChange({ ...change, shopEmail: !change.shopEmail });
        break;
      case "shopEmailReverse":
        setListShop(listShop.sort((a, b) => b.email.localeCompare(a.email)));
        setChange({ ...change, shopEmail: !change.shopEmail });
        break;

      case "shopAddress":
        setListShop(
          listShop.sort((a, b) => a.address.localeCompare(b.address))
        );
        setChange({ ...change, shopAddress: !change.shopAddress });
        break;
      case "shopAddressReverse":
        setListShop(
          listShop.sort((a, b) => b.address.localeCompare(a.address))
        );
        setChange({ ...change, shopAddress: !change.shopAddress });

      case "shopStatus":
        setListShop(listShop.sort((a, b) => a.status.localeCompare(b.status)));
        setChange({ ...change, shopStatus: !change.shopStatus });
        break;
      case "shopStatusReverse":
        setListShop(listShop.sort((a, b) => b.status.localeCompare(a.status)));
        setChange({ ...change, shopStatus: !change.shopStatus });
        break;
      default:
        break;
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

              {/* shopName */}
              <TableCell align="center">
                {change.name ? (
                  <Typography
                    sx={{ display: "flex", alignItems: "center" }}
                    onClick={() => handleSort("name")}
                  >
                    Shop's Name
                    <ArrowDropUpIcon />
                  </Typography>
                ) : (
                  <Typography
                    sx={{ display: "flex", alignItems: "center" }}
                    onClick={() => handleSort("nameReverse")}
                  >
                    Shop's Name
                    <ArrowDropDownIcon />
                  </Typography>
                )}
              </TableCell>

              {/* shopOwner */}
              <TableCell align="center">
                {change.shopOwner ? (
                  <Typography
                    sx={{ display: "flex", alignItems: "center" }}
                    onClick={() => handleSort("shopOwner")}
                  >
                    Shop's Owner
                    <ArrowDropUpIcon />
                  </Typography>
                ) : (
                  <Typography
                    sx={{ display: "flex", alignItems: "center" }}
                    onClick={() => handleSort("shopOwnerReverse")}
                  >
                    Shop's Owner
                    <ArrowDropDownIcon />
                  </Typography>
                )}
              </TableCell>

              {/* shopEmail */}
              <TableCell align="center">
                {change.shopEmail ? (
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => handleSort("shopEmail")}
                  >
                    Shop's Email
                    <ArrowDropUpIcon />
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => handleSort("shopEmailReverse")}
                  >
                    Shop's Email
                    <ArrowDropDownIcon />
                  </Typography>
                )}
              </TableCell>

              <TableCell align="center">Shop's PhoneNumber</TableCell>

              {/* shopAddress */}
              <TableCell align="center">
                {change.shopAddress ? (
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => handleSort("shopAddress")}
                  >
                    Shop's Address
                    <ArrowDropUpIcon />
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => handleSort("shopAddressReverse")}
                  >
                    Shop's Address
                    <ArrowDropDownIcon />
                  </Typography>
                )}
              </TableCell>

              {/* shopStatus */}
              <TableCell align="center">
                {change.shopStatus ? (
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => handleSort("shopStatus")}
                  >
                    Shop's Status
                    <ArrowDropUpIcon />
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => handleSort("shopStatusReverse")}
                  >
                    Shop's Status
                    <ArrowDropDownIcon />
                  </Typography>
                )}
              </TableCell>
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
