import React, { useEffect, useState } from "react";
import { createSearchParams, Link, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Rating,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { formatPrice } from "../../../utils/formatter";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { fetchProductAPI, findProductAPI } from "../../../api";
import _ from "lodash";
import LoadingPage from "./LoadingPage";
import { toast } from "react-toastify";
import StarRateIcon from "@mui/icons-material/StarRate";
import ListIcon from "@mui/icons-material/List";
import FilterListAltIcon from "@mui/icons-material/FilterListAlt";

const styleOption = {
  bgcolor: "white",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "90px",
  height: "32px",
  fontSize: "14px",
};
const SearchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState({
    price: {
      from: "",
      to: "",
    },
    rating: 0,
  });

  const [change, setChange] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  let [searchParams] = useSearchParams();
  const { value } = Object.fromEntries([...searchParams]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = () => {
    setLoading(true);
    const searchPath = `?${createSearchParams({ "q[name]": value })}`;
    fetchProductAPI(searchPath).then((res) => {
      setData(res);
      setLoading(false);
    });
  };

  const findProduct = (ratingValue = null) => {
    let searchValueClone = _.cloneDeep(searchValue);
    let dataToSearch = {};
    if (searchValueClone.price.from) {
      if (
        (+searchValueClone.price.from >= 1 &&
          +searchValueClone.price.from < 1000) ||
        (+searchValueClone.price.from === 0 && +searchValueClone.price.to >= 1)
      ) {
        toast.warning("Nhập mệnh giá nhỏ nhất từ 1000đ trở lên");
        return;
      }
      searchValueClone.price.from = +searchValueClone.price.from;
      searchValueClone.price.to = +searchValueClone.price.to;
      if (searchValueClone.price.from > searchValueClone.price.to) {
        toast.error("Giá từ phải nhỏ hơn giá đến");
        return;
      }
      dataToSearch.price = searchValueClone.price;
    }
    if (searchValueClone?.rating >= 1) {
      dataToSearch.ratingAverage = searchValueClone.rating;
    } else if (ratingValue) {
      dataToSearch.ratingAverage = ratingValue;
    }
    if (value) {
      dataToSearch.value = value;
    }

    setLoading(true);
    findProductAPI({ data: dataToSearch })
      .then((res) => {
        setData(res);
        setSearchValue({
          price: {
            from: "",
            to: "",
          },
          rating: 0,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSortPrice = (id) => {
    switch (id) {
      case "sold":
        const test = data.sort((a, b) => b.sold - a.sold);
        setChange(!change);
        setData(test);
        break;
      case "price":
        if (searchValue.price === true) {
          setData(data.sort((a, b) => a.price - b.price));
          setSearchValue({ ...searchValue, price: !searchValue.price });
        } else {
          setData(data.sort((a, b) => b.price - a.price));
          setSearchValue({
            ...searchValue,
            price: !searchValue.price,
          });
        }
        break;

      case "rate":
        setData(data.sort((a, b) => b.ratingAverage - a.ratingAverage));
        setChange(!change);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleSearch();
  }, [value]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Box sx={{ bgcolor: "#f5f5f5" }}>
      <Header showHeader={true} />
      <Container sx={{ my: 3 }}>
        {data?.length === 0 ? (
          <Box
            sx={{
              height: (theme) => theme.customHeight.Body,
              width: "100%",
            }}
          >
            <Typography
              sx={{
                color: "black",
                m: "20px 0",
                textAlign: "center",
              }}
            >
              Không tìm thấy sản phẩm phù hợp với yêu cầu
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: "20%",
                p: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontSize: "20px",
                }}
              >
                <FilterListAltIcon />
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "15px",
                    textTransform: "uppercase",
                  }}
                >
                  Bộ lọc tìm kiếm
                </Typography>
              </Box>

              {/* find by price */}
              <Box>
                <Typography>Khoảng giá</Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 3,
                    // justifyContent: "space-between",
                  }}
                >
                  <TextField
                    size="small"
                    placeholder="từ"
                    type="number"
                    sx={{
                      width: "100px",
                      bgcolor: "white",
                      "& input": {
                        height: "15px",
                        fontSize: "12px",
                        p: "8px",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                          color: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                          color: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                          color: "white",
                        },
                      },
                    }}
                    value={searchValue.price.from}
                    onChange={(e) =>
                      setSearchValue({
                        ...searchValue,
                        price: {
                          ...searchValue.price,
                          from: e.target.value,
                        },
                      })
                    }
                  />
                  <Divider sx={{ bgcolor: "black", width: "5px" }} />
                  <TextField
                    size="small"
                    placeholder="đến"
                    type="number"
                    sx={{
                      width: "100px",
                      bgcolor: "white",
                      "& input": {
                        height: "15px",
                        fontSize: "12px",
                        p: "8px",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                          color: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                          color: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                          color: "white",
                        },
                      },
                    }}
                    value={searchValue.price.to}
                    onChange={(e) =>
                      setSearchValue({
                        ...searchValue,
                        price: {
                          ...searchValue.price,
                          to: e.target.value,
                        },
                      })
                    }
                  />
                </Box>

                <Button
                  sx={{
                    bgcolor: (theme) => theme.commonColors,
                    color: "white",
                    mt: 1,
                  }}
                  onClick={() => findProduct()}
                  size="small"
                  fullWidth
                >
                  Áp dụng
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box>
                <Typography>đánh giá</Typography>
                <Box>
                  <Rating
                    name="simple-controlled"
                    value={searchValue.rating}
                    onChange={(event, newValue) => {
                      setSearchValue({
                        ...searchValue,
                        rating: newValue,
                      });

                      findProduct(newValue);
                    }}
                  />
                </Box>
              </Box>

              <Button
                sx={{
                  bgcolor: (theme) => theme.commonColors,
                  color: "white",
                  mt: 1,
                }}
                size="small"
                fullWidth
              >
                Xoá tất cả
              </Button>
            </Box>

            {/* result data search */}
            <Box sx={{ width: "80%" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1,
                  bgcolor: "rgba(0, 0, 0, .03)",
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "14px" }}>
                    Sắp xếp theo:
                  </Typography>
                  <Box sx={styleOption} onClick={() => handleSortPrice("sold")}>
                    Bán chạy
                  </Box>

                  <Box
                    sx={styleOption}
                    onClick={() => handleSortPrice("price")}
                  >
                    Giá
                    {!searchValue.price ? (
                      <KeyboardArrowDownIcon />
                    ) : (
                      <KeyboardArrowUpIcon />
                    )}
                  </Box>

                  <Box sx={styleOption} onClick={() => handleSortPrice("rate")}>
                    Đánh giá
                  </Box>
                </Box>

                <TablePagination
                  component="div"
                  count={data?.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[10, 15, 20]}
                  sx={{ width: "400px" }}
                />
              </Box>

              {data?.length > 0 ? (
                <Grid container spacing={2.5}>
                  {data
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    ?.map((item) => {
                      return (
                        <Box
                          key={item?._id}
                          sx={{ display: "flex", width: "180px" }}
                        >
                          <Box
                            sx={{
                              border: "1px solid rgba(0, 0, 0, .05)",
                              textAlign: "center",
                              "&:hover": {
                                borderColor: (theme) => theme.commonColors,
                                boxShadow: "0 0 .8125rem 0 rgba(0, 0, 0, .05)",
                                transform: "scale(1)",
                              },
                              overflow: "hidden",
                              bgcolor: "white",
                            }}
                            component={Link}
                            to={`/detail?id=${item?._id}`}
                          >
                            <img
                              src={item?.image[0]}
                              alt={item?.name}
                              style={{
                                width: "100%",
                                border: "1px solid black",
                                height: "180px",
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
                                  <Typography>
                                    {formatPrice(item?.price)}
                                  </Typography>
                                </Box>
                                <Typography sx={{ fontSize: "14px" }}>
                                  Đã bán: {item?.sold}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      );
                    })}
                </Grid>
              ) : (
                <Box sx={{ bgcolor: "#f5f5f5" }}>
                  <Header showHeader={true} />
                  <Container sx={{ color: "black" }}>
                    <Typography>
                      Không tìm thấy mặt hàng nào theo yêu cầu
                    </Typography>
                  </Container>
                  <Footer />
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default SearchData;
