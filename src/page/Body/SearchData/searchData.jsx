import React, { useEffect, useState } from "react";
import { createSearchParams, Link, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  Rating,
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

const SearchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [optionSortPrice, setOptionSortPrice] = useState(false);
  const [optionSortAlphabet, setOptionSortAlphabet] = useState(false);
  const [searchValue, setSearchValue] = useState({
    price: {
      from: "",
      to: "",
    },
    rating: 0,
  });

  const [change, setChange] = useState(false);
  let [searchParams] = useSearchParams();
  const { value, tags } = Object.fromEntries([...searchParams]);

  const handleSearch = () => {
    setLoading(true);
    const searchPath = `?${createSearchParams({ "q[name]": value })}`;
    fetchProductAPI(searchPath).then((res) => {
      setData(res);
      setLoading(false);
    });
  };

  const findProduct = () => {
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
    }
    if (value) {
      dataToSearch.value = value;
    }
    if (tags) {
      dataToSearch.tags = tags;
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

  useEffect(() => {
    if (tags) {
      findProduct();
    }
    handleSearch();
  }, [value, tags]);

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
        const test = data.sort((a, b) => b.sold - a.sold);
        setChange(!change);
        setData(test);
        break;
      case "high":
        setData(data.sort((a, b) => a.price - b.price));
        setOptionSortPrice(!optionSortPrice);
        break;
      case "low":
        setData(data.sort((a, b) => b.price - a.price));
        setOptionSortPrice(!optionSortPrice);
        break;
      case "ABC":
        setData(data.sort((a, b) => a.name.localeCompare(b.name)));
        setOptionSortAlphabet(!optionSortAlphabet);
        break;
      case "CBA":
        setData(data.sort((a, b) => b.name.localeCompare(a.name)));
        setOptionSortAlphabet(!optionSortAlphabet);
        break;
      case "ratingAverage":
        setData(data.sort((a, b) => b.ratingAverage - a.ratingAverage));
        setChange(!change);
        break;
      default:
        break;
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Box sx={{ bgcolor: "#f5f5f5" }}>
      <Header showHeader={true} />
      <Container>
        {data?.length === 0 ? (
          <Box
            sx={{
              height: (theme) => theme.customHeight.Body,
              width: "100%",
            }}
          >
            <Box
              sx={{
                bgcolor: "#ededed",
                p: 2,
                // width: "100%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  py: 2,
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
                <Box
                  sx={styleOption}
                  onClick={() => handleSortPrice("ratingAverage")}
                >
                  Theo đánh giá
                </Box>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  py: 2,
                }}
              >
                <Typography>Khoảng giá:</Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    type="number"
                    size="small"
                    sx={{
                      bgcolor: "white",
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
                    placeholder="từ"
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

                  <TextField
                    type="number"
                    size="small"
                    sx={{
                      bgcolor: "white",
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
                    placeholder="đến"
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
              </Box>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  py: 2,
                }}
              >
                <Typography>đánh giá:</Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Rating
                    name="simple-controlled"
                    value={searchValue.rating}
                    onChange={(event, newValue) => {
                      setSearchValue({
                        ...searchValue,
                        rating: newValue,
                      });
                    }}
                  />
                </Box>
              </Box>

              <Button
                sx={{
                  bgcolor: (theme) => theme.commonColors,
                  color: "white",
                  m: "auto",
                }}
                onClick={() => findProduct("price")}
              >
                Áp dụng
              </Button>
            </Box>
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
              p: 3,
            }}
          >
            <Box
              sx={{
                bgcolor: "#ededed",
                p: 2,
                // width: "100%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  py: 2,
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
                <Box
                  sx={styleOption}
                  onClick={() => handleSortPrice("ratingAverage")}
                >
                  Theo đánh giá
                </Box>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  py: 2,
                }}
              >
                <Typography>Khoảng giá:</Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    type="number"
                    size="small"
                    sx={{
                      bgcolor: "white",
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
                    placeholder="từ"
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

                  <TextField
                    type="number"
                    size="small"
                    sx={{
                      bgcolor: "white",
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
                    placeholder="đến"
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
              </Box>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  py: 2,
                }}
              >
                <Typography>đánh giá:</Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Rating
                    name="simple-controlled"
                    value={searchValue.rating}
                    onChange={(event, newValue) => {
                      setSearchValue({
                        ...searchValue,
                        rating: newValue,
                      });
                    }}
                  />
                </Box>
              </Box>

              <Button
                sx={{
                  bgcolor: (theme) => theme.commonColors,
                  color: "white",
                  m: "auto",
                }}
                onClick={() => findProduct("price")}
              >
                Áp dụng
              </Button>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                p: "15px 0",
              }}
            >
              {data?.length > 0 ? (
                <Grid container spacing={2}>
                  {data?.map((item) => {
                    return (
                      <Grid
                        size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
                        key={item?._id}
                        sx={{ display: "flex" }}
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
                      </Grid>
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
