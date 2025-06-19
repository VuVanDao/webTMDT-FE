import { Box, Grid, Stack, TablePagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/formatter";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../../../redux/slice/userInfoSlice";
import { getAllProductUser } from "../../../api";
import StarRateIcon from "@mui/icons-material/StarRate";
const Recommend = () => {
  const [optionSortPrice, setOptionSortPrice] = useState(false);
  const [optionSortAlphabet, setOptionSortAlphabet] = useState(false);
  const [change, setChange] = useState(false);
  const userInfo = useSelector(userInfoSelector);
  const [listProduct, setListProduct] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleGetAllProduct = async () => {
    const res = await getAllProductUser();
    if (!res.error) {
      res?.map((item) => {
        if (item?.comments?.length === 0) {
          item.ratingAverage = 0;
        } else {
          item.ratingAverage =
            item.comments.reduce((sum, item) => sum + item.rating, 0) /
            item.comments.length;
        }
      });
      setListProduct(res);
    }
  };

  useEffect(() => {
    handleGetAllProduct();
  }, []);
  const styleOption = {
    bgcolor: "white",
    p: "10px 25px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  };
  const handleSortPrice = (id) => {
    switch (id) {
      case "sell":
        setChange(!change);
        setListProduct(listProduct.sort((a, b) => b.sold - a.sold));
        break;
      case "high":
        setListProduct(listProduct.sort((a, b) => a.price - b.price));
        setOptionSortPrice(!optionSortPrice);
        break;
      case "low":
        setListProduct(listProduct.sort((a, b) => b.price - a.price));
        setOptionSortPrice(!optionSortPrice);
        break;
      case "ABC":
        setListProduct(
          listProduct.sort((a, b) => a.name.localeCompare(b.name))
        );
        setOptionSortAlphabet(!optionSortAlphabet);
        break;
      case "CBA":
        setListProduct(
          listProduct.sort((a, b) => b.name.localeCompare(a.name))
        );
        setOptionSortAlphabet(!optionSortAlphabet);
        break;
      default:
        break;
    }
  };
  return (
    <Box>
      <Box
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Box
          sx={{
            textAlign: "center",
            p: 3,
            borderBottom: "5px solid",
            borderBottomColor: (theme) => theme.commonColors,
            bgcolor: "white",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: (theme) => theme.commonColors }}
          >
            Gợi ý hôm nay
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: "#ededed",
            width: "100%",
            p: 2.25,
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography>Sắp xếp theo:</Typography>
          <Box sx={styleOption} onClick={() => handleSortPrice("sell")}>
            Bán chạy
          </Box>

          {optionSortAlphabet ? (
            <Box sx={styleOption} onClick={() => handleSortPrice("ABC")}>
              A - Z
            </Box>
          ) : (
            <Box sx={styleOption} onClick={() => handleSortPrice("CBA")}>
              Z - A
            </Box>
          )}

          {optionSortPrice ? (
            <Box sx={styleOption} onClick={() => handleSortPrice("high")}>
              Giá từ cao đến thấp <KeyboardArrowDownIcon />
            </Box>
          ) : (
            <Box sx={styleOption} onClick={() => handleSortPrice("low")}>
              Giá từ thấp đến cao <KeyboardArrowUpIcon />
            </Box>
          )}
        </Box>
        <Grid container spacing={2} sx={{ bgcolor: (theme) => theme.bgColor }}>
          {listProduct
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item) => {
              return (
                <Grid
                  size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
                  key={item._id}
                  sx={{ display: "flex" }}
                >
                  <Box
                    sx={{
                      border: "1px solid rgba(0, 0, 0, .05)",
                      textAlign: "center",
                      "&:hover": {
                        borderColor: (theme) => theme.commonColors,
                        boxShadow: 3,
                        transform: "scale(1.05)",
                        transition: "all 0.3s ease",
                      },
                      overflow: "hidden",
                      bgcolor: "white",
                    }}
                    component={Link}
                    to={`/detail?id=${item._id}`}
                  >
                    <img
                      src={item?.image[0]}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "185px",
                        border: "1px solid black",
                      }}
                    />
                    <Box sx={{ p: 1 }}>
                      <Box
                        sx={{
                          height: "50px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          color: "black",
                          mb: 3,
                        }}
                      >
                        <Typography>{item?.name}</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          color: "black",
                          alignItems: "flex-end",
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <StarRateIcon
                              sx={{
                                color: "gold",
                                fontSize: "14px",
                              }}
                            />
                            {item?.ratingAverage}
                          </Typography>
                          <Typography>{formatPrice(item?.price)}</Typography>
                        </Box>
                        <Typography sx={{ fontSize: "14px" }}>
                          Đã bán: {item?.sold}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
        </Grid>
      </Box>
      <TablePagination
        component="div"
        count={listProduct?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[12, 18, 24]}
      />
    </Box>
  );
};

export default Recommend;
