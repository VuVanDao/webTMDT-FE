import React, { useEffect, useState } from "react";
import { getOrderByShopId } from "../../../../api";
import { Avatar, Box, TablePagination, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { formatPrice } from "../../../../utils/formatter";
import _ from "lodash";

const List_rating_tab = ({ products }) => {
  const [listComments, setListComments] = useState([]);
  const [change, setChange] = useState({
    username: false,
    rating: false,
    commentAt: false,
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
      case "username":
        setListComments(
          listComments.sort((a, b) => a.username.localeCompare(b.username))
        );
        setChange({ ...change, username: !change.username });
        break;
      case "usernameReverse":
        setListComments(
          listComments.sort((a, b) => b.username.localeCompare(a.username))
        );
        setChange({ ...change, username: !change.username });
        break;

      case "rating":
        setListComments(listComments.sort((a, b) => a.rating - b.rating));
        setChange({ ...change, rating: !change.rating });
        break;
      case "ratingReverse":
        setListComments(listComments.sort((a, b) => b.rating - a.rating));
        setChange({ ...change, rating: !change.rating });
        break;

      case "commentAt":
        setListComments(listComments.sort((a, b) => a.commentAt - b.commentAt));
        setChange({ ...change, commentAt: !change.commentAt });
        break;
      case "commentAtReverse":
        setListComments(
          listComments.sort(
            (a, b) =>
              (b.commentAt ? b.commentAt : 0) - (a.commentAt ? a.commentAt : 0)
          )
        );
        setChange({ ...change, commentAt: !change.commentAt });
        break;
      default:
        break;
    }
  };
  const handleBuildDataComments = () => {
    let dataToSet = [];
    let productsClone = _.cloneDeep(products);

    productsClone?.map((item) => {
      item?.comments?.map((i) => (i.productName = item.name));
      dataToSet = dataToSet.concat(item?.comments);
    });

    setListComments(dataToSet);
  };
  useEffect(() => {
    if (products) {
      handleBuildDataComments();
    }
  }, []);

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow sx={{ cursor: "pointer" }}>
            {/* avatar */}
            <TableCell>Avatar</TableCell>

            {/* username */}
            <TableCell>
              {change?.username ? (
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() => handleSort("username")}
                >
                  Tên khách hàng
                  <ArrowDropUpIcon />
                </Typography>
              ) : (
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() => handleSort("usernameReverse")}
                >
                  Tên khách hàng
                  <ArrowDropDownIcon />
                </Typography>
              )}
            </TableCell>

            {/* commentContent */}
            <TableCell>Nội dung đánh giá</TableCell>

            {/* commentContent */}
            <TableCell>Sản phẩm</TableCell>

            {/* rating */}
            <TableCell sx={{ width: "165px" }}>
              {change?.rating ? (
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  onClick={() => handleSort("rating")}
                >
                  Điểm đánh giá
                  <ArrowDropUpIcon />
                </Typography>
              ) : (
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  onClick={() => handleSort("ratingReverse")}
                >
                  Điểm đánh giá
                  <ArrowDropDownIcon />
                </Typography>
              )}
            </TableCell>

            {/* commentAt */}
            <TableCell align="center">
              {change?.commentAt ? (
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  onClick={() => handleSort("commentAt")}
                >
                  Ngày đánh giá
                  <ArrowDropUpIcon />
                </Typography>
              ) : (
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  onClick={() => handleSort("commentAtReverse")}
                >
                  Ngày đánh giá
                  <ArrowDropDownIcon />
                </Typography>
              )}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {listComments
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((comment, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Box>
                    <Avatar src={comment?.userAvatar} />
                  </Box>
                </TableCell>

                <TableCell>
                  <Box>{comment.username}</Box>
                </TableCell>
                <TableCell sx={{ width: "300px" }}>
                  {comment.commentContent}
                </TableCell>
                <TableCell sx={{ width: "450px" }}>
                  {comment.productName}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {comment.rating}
                </TableCell>
                <TableCell>
                  {new Date(comment.commentAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={listComments?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[3, 5, 7]}
      />
    </Box>
  );
};

export default List_rating_tab;
