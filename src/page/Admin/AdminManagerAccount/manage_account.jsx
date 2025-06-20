import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { deleteAccount, getAllAccount } from "../../../api";
import {
  Avatar,
  Box,
  Button,
  Container,
  TablePagination,
  Typography,
} from "@mui/material";
import { ModalAddAccount } from "./ModalAddAccount";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { ModalUpdateAccount } from "./ModalUpdateAccount";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Manage_account = () => {
  const [listAccount, setListAccount] = useState([]);
  const [open, setOpen] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [infoAccountToUpdate, setInfoAccountToUpdate] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [change, setChange] = useState({
    name: false,
    email: false,
    phoneNumber: false,
    address: false,
    role: false,
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

  const handleGetAllAccount = async () => {
    const res = await getAllAccount();
    if (!res.error) {
      setListAccount(res);
    }
  };
  const handleUpdateAccount = (item) => {
    setInfoAccountToUpdate(item);
    setOpenModalUpdate(!openModalUpdate);
  };
  const handleDeleteAccount = async (item) => {
    await deleteAccount(item).then((res) => {
      if (!res?.error) {
        handleGetAllAccount();
      }
    });
  };
  const handleSort = (type) => {
    switch (type) {
      case "name":
        setListAccount(
          listAccount.sort((a, b) => a.username.localeCompare(b.username))
        );
        setChange({ ...change, name: !change.name });
        break;
      case "nameReverse":
        setListAccount(
          listAccount.sort((a, b) => b.username.localeCompare(a.username))
        );
        setChange({ ...change, name: !change.name });
        break;

      case "email":
        setListAccount(
          listAccount.sort((a, b) => a.email.localeCompare(b.email))
        );
        setChange({ ...change, email: !change.email });
        break;
      case "emailReverse":
        setListAccount(
          listAccount.sort((a, b) => b.email.localeCompare(a.email))
        );
        setChange({ ...change, email: !change.email });
        break;

      case "phoneNumber":
        setListAccount(
          listAccount.sort((a, b) => a.phoneNumber.localeCompare(b.phoneNumber))
        );
        setChange({ ...change, phoneNumber: !change.phoneNumber });
        break;
      case "phoneNumberReverse":
        setListAccount(
          listAccount.sort((a, b) => b.phoneNumber.localeCompare(a.phoneNumber))
        );
        setChange({ ...change, phoneNumber: !change.phoneNumber });
        break;

      case "role":
        setListAccount(
          listAccount.sort((a, b) => a.role.localeCompare(b.role))
        );
        setChange({ ...change, role: !change.role });
        break;
      case "roleReverse":
        setListAccount(
          listAccount.sort((a, b) => b.role.localeCompare(a.role))
        );
        setChange({ ...change, role: !change.role });
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    handleGetAllAccount();
  }, []);
  return (
    <Box sx={{ my: 3, bgcolor: (theme) => theme.whiteColor, p: 3, mx: 5 }}>
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
            <TableRow sx={{ cursor: "pointer" }}>
              <TableCell>Avatar</TableCell>
              {/* name */}
              <TableCell align="center">
                {change.name ? (
                  <Typography
                    sx={{ display: "flex", alignItems: "center" }}
                    onClick={() => handleSort("name")}
                  >
                    Name
                    <ArrowDropUpIcon />
                  </Typography>
                ) : (
                  <Typography
                    sx={{ display: "flex", alignItems: "center" }}
                    onClick={() => handleSort("nameReverse")}
                  >
                    Name
                    <ArrowDropDownIcon />
                  </Typography>
                )}
              </TableCell>

              {/* email */}
              <TableCell align="center">
                <Box>
                  {change.email ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={() => handleSort("email")}
                    >
                      Email
                      <ArrowDropUpIcon />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={() => handleSort("emailReverse")}
                    >
                      Email
                      <ArrowDropDownIcon />
                    </Box>
                  )}
                </Box>
              </TableCell>

              {/* phoneNumber */}
              <TableCell>
                {change.phoneNumber ? (
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => handleSort("phoneNumber")}
                  >
                    PhoneNumber
                    <ArrowDropUpIcon />
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => handleSort("phoneNumberReverse")}
                  >
                    PhoneNumber
                    <ArrowDropDownIcon />
                  </Typography>
                )}
              </TableCell>
              <TableCell align="center">Address</TableCell>

              {/* role */}
              <TableCell align="center">
                {change.role ? (
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => handleSort("role")}
                  >
                    Role
                    <ArrowDropUpIcon />
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => handleSort("roleReverse")}
                  >
                    Role
                    <ArrowDropDownIcon />
                  </Typography>
                )}
              </TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listAccount
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item?._id}>
                  <TableCell component="th" scope="row">
                    <Avatar src={item?.avatar} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item?.username}
                  </TableCell>
                  <TableCell align="center">{item?.email}</TableCell>
                  <TableCell align="center">{item?.phoneNumber}</TableCell>
                  <TableCell align="center" sx={{ width: "355px" }}>
                    {item?.address}
                  </TableCell>
                  <TableCell align="center">{item?.role}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", gap: 3 }}>
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: (theme) => theme.commonColors,
                          color: "white",
                        }}
                        onClick={() => handleUpdateAccount(item)}
                      >
                        Chỉnh
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleDeleteAccount(item?._id);
                        }}
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
        count={listAccount.length}
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
      <ModalAddAccount
        open={open}
        setOpen={setOpen}
        handleGetAllAccount={handleGetAllAccount}
      />
      <ModalUpdateAccount
        open={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        handleGetAllAccount={handleGetAllAccount}
        infoAccountToUpdate={infoAccountToUpdate}
      />
    </Box>
  );
};

export default Manage_account;
