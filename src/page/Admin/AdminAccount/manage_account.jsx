import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { getAllAccount } from "../../../api";
import { Avatar, Box, Button } from "@mui/material";

const paginationModel = { page: 0, pageSize: 5 };

const Manage_account = () => {
  const [listAccount, setListAccount] = useState([]);
  const handleGetAllAccount = async () => {
    const res = await getAllAccount();
    if (!res.error) {
      setListAccount(res);
    }
  };
  useEffect(() => {
    handleGetAllAccount();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">PhoneNumber</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Role</TableCell>
            <TableCell align="center">Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listAccount.map((item) => (
            <TableRow key={item?._id}>
              <TableCell component="th" scope="row">
                <Avatar src={item?.avatar} />
              </TableCell>
              <TableCell component="th" scope="row">
                {item?.username}
              </TableCell>
              <TableCell align="center">{item?.email}</TableCell>
              <TableCell align="center">{item?.phoneNumber}</TableCell>
              <TableCell align="center">{item?.address}</TableCell>
              <TableCell align="center">{item?.role}</TableCell>
              <TableCell align="center">
                <Box sx={{ display: "flex", gap: 3 }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: (theme) => theme.commonColors,
                      color: "white",
                    }}
                  >
                    Chỉnh
                  </Button>
                  <Button variant="contained">Xoá</Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Manage_account;
