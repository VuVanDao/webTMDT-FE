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
import { Link, useSearchParams } from "react-router-dom";
import ListIcon from "@mui/icons-material/List";
import FilterListAltIcon from "@mui/icons-material/FilterListAlt";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StarRateIcon from "@mui/icons-material/StarRate";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import PageLoadingSpinner from "../../../components/Loading/PageLoadingSpinner";

// swiper
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import { list_image_findByTagPage } from "../../../utils/constants";
import { useEffect, useState } from "react";
import { findBrandByTags } from "../../../api/brandAPI/brandAPI";
import { findProductAPI } from "../../../api";
import { toast } from "react-toastify";
import { formatPrice } from "../../../utils/formatter";

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
const FindByTag = () => {
  const pagination = {
    clickable: true,
  };
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
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
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState({
    price: false,
  });

  let [searchParams] = useSearchParams();
  const { tags } = Object.fromEntries([...searchParams]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleGetBrand = () => {
    setLoading(true);
    findBrandByTags({ data: { tags } }).then((res) => {
      if (!res?.error && res.length > 0) {
        setBrands(res);
      }
      setLoading(false);
    });
  };

  const findProducts = () => {
    setLoading(true);
    findProductAPI({ data: { tags } })
      .then((res) => {
        setProducts(res);
      })
      .finally(() => setLoading(false));
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
    if (tags) {
      dataToSearch.tags = tags;
    }

    setLoading(true);
    findProductAPI({ data: dataToSearch }).then((res) => {
      setData(res);
      setSearchValue({
        price: {
          from: "",
          to: "",
        },
      });
      setLoading(false);
    });
  };

  const handleSortPrice = (id) => {
    switch (id) {
      case "sold":
        const test = products.sort((a, b) => b.sold - a.sold);
        setChange(!change);
        setProducts(test);
        break;
      case "price":
        if (sortOption.price === true) {
          setProducts(products.sort((a, b) => a.price - b.price));
          setSortOption({ ...sortOption, price: !sortOption.price });
        } else {
          setProducts(products.sort((a, b) => b.price - a.price));
          setSortOption({
            ...sortOption,
            price: !sortOption.price,
          });
        }
        break;

      case "rate":
        setProducts(products.sort((a, b) => b.ratingAverage - a.ratingAverage));
        setChange(!change);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    handleGetBrand();
    findProducts();
  }, []);
  return (
    <Box>
      {loading && <PageLoadingSpinner caption="Đang tải dữ liệu..." />}
      {!loading && (
        <>
          <Header showHeader={true} />
          <Box sx={{ p: 3, bgcolor: (theme) => theme.bgColor }}>
            <Container>
              {/* slider */}
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: 1,
                  "& .swiper-slide": {
                    fontSize: "18px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  "& .swiper-pagination-bullet": {
                    bgcolor: "rgba(255, 255, 255, 0.4)",
                    borderColor: "1px solid rgba(137, 137, 137, 0.4)",
                    opacity: 1,
                    height: "10px",
                    width: "10px",
                  },
                  "& .swiper-pagination-bullet-active": {
                    bgcolor: (theme) => theme.commonColors,
                    height: "10px",
                    width: "10px",
                  },
                  "& .swiper .swiper-button-prev": {
                    color: "rgb(255, 255, 255)",
                    bgcolor: "rgba(0,0,0,0.18)",
                    py: 4,
                    px: 2.5,
                    left: 0,
                  },
                  "& .swiper .swiper-button-prev::after": {
                    fontSize: "20px",
                    marginLeft: -1,
                  },
                  "& .swiper .swiper-button-next": {
                    color: "rgb(255, 255, 255)",
                    bgcolor: "rgba(0,0,0,0.18)",
                    py: 4,
                    px: 2.5,
                    right: 0,
                  },
                  "& .swiper .swiper-button-next::after": {
                    fontSize: "20px",
                    marginRight: -1,
                  },
                  height: "355px",
                }}
              >
                <Swiper
                  pagination={pagination}
                  modules={[Pagination, Navigation]}
                  spaceBetween={30}
                  loop
                  navigation
                >
                  {list_image_findByTagPage?.map((item, index) => (
                    <SwiperSlide key={index}>
                      <Box>
                        <img src={item} style={{ cursor: "pointer" }} />
                      </Box>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>

              {/* brand */}
              <Grid container mt={4}>
                {brands?.map(({ _id, brandName, brandImage }, index) => {
                  if (index < 12) {
                    return (
                      <Grid
                        key={_id}
                        size={{ xs: 6, sm: 4, md: 2 }}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "112px",
                          width: "200px",
                          cursor: "pointer",
                          boxShadow: "0 0 4px 0 rgba(0,0,0,.08)",
                        }}
                      >
                        <img
                          src={brandImage}
                          alt={brandName}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </Grid>
                    );
                  }
                })}
              </Grid>

              <Box
                sx={{
                  mt: 4,
                  width: "100%",
                  display: "flex",
                }}
              >
                {/* left */}
                <Box
                  sx={{
                    width: "20%",
                    p: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ListIcon />
                    <Typography
                      sx={{
                        fontSize: "17px",
                        fontWeight: 700,
                      }}
                    >
                      Tất cả danh mục
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 1 }} />

                  <ul>
                    <li>{tags}</li>
                  </ul>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      fontSize: "20px",
                    }}
                  >
                    <FilterListAltIcon />
                    <Typography sx={{ fontWeight: 700 }}>
                      Bộ lọc tìm kiếm
                    </Typography>
                  </Box>

                  <Box p={1}>
                    <Typography>Khoảng giá</Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 3,
                        justifyContent: "space-between",
                      }}
                    >
                      <TextField
                        size="small"
                        placeholder="từ"
                        type="number"
                        sx={{
                          width: "80px",
                          bgcolor: "white",
                          "& input": {
                            height: "15px",
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
                      <Divider sx={{ bgcolor: "black", width: "10px" }} />
                      <TextField
                        size="small"
                        placeholder="đến"
                        type="number"
                        sx={{
                          width: "80px",
                          bgcolor: "white",
                          "& input": {
                            height: "15px",
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
                      onClick={() => findProduct("price")}
                      size="small"
                      fullWidth
                    >
                      Áp dụng
                    </Button>
                  </Box>

                  <Divider />

                  <Box p={1}>
                    <Typography>đánh giá:</Typography>
                    <Box>
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
                      mt: 1,
                    }}
                    size="small"
                    fullWidth
                  >
                    Xoá tất cả
                  </Button>
                </Box>

                {/* right */}
                <Box
                  sx={{
                    width: "80%",
                  }}
                >
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
                        width: "100%",
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                      }}
                    >
                      <Typography sx={{ fontSize: "14px" }}>
                        Sắp xếp theo:
                      </Typography>
                      <Box
                        sx={styleOption}
                        onClick={() => handleSortPrice("sold")}
                      >
                        Bán chạy
                      </Box>

                      <Box
                        sx={styleOption}
                        onClick={() => handleSortPrice("price")}
                      >
                        Giá
                        {sortOption.price ? (
                          <KeyboardArrowDownIcon />
                        ) : (
                          <KeyboardArrowUpIcon />
                        )}
                      </Box>

                      <Box
                        sx={styleOption}
                        onClick={() => handleSortPrice("rate")}
                      >
                        Đánh giá
                      </Box>
                    </Box>

                    <TablePagination
                      component="div"
                      count={products?.length}
                      page={page}
                      onPageChange={handleChangePage}
                      rowsPerPage={rowsPerPage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      rowsPerPageOptions={[10, 15, 20]}
                      sx={{ width: "650px" }}
                    />
                  </Box>

                  <Grid container spacing={2.5}>
                    {products
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      ?.map((item) => {
                        return (
                          <Box
                            key={item._id}
                            sx={{ display: "flex", width: "180px" }}
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
                                  height: "180px",
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
                </Box>
              </Box>
            </Container>
          </Box>
          <Footer />
        </>
      )}
    </Box>
  );
};

export default FindByTag;
