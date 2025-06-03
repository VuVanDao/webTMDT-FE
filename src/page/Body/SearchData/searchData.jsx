import React, { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { formatPrice } from "../../../utils/formatter";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const SearchData = () => {
  const [data, setData] = useState([]);
  const [optionSortPrice, setOptionSortPrice] = useState(false);
  const [change, setChange] = useState(false);
  let [searchParams] = useSearchParams();
  const { value } = Object.fromEntries([...searchParams]);
  const location = useLocation();
  let resultSearch = location?.state?.results;
  useEffect(() => {}, [value]);
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
      default:
        break;
    }
  };
  if (!value) {
    return (
      <Box sx={{ bgcolor: "#f5f5f5" }}>
        <Header showHeader={true} />
        <Container sx={{ color: "black" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: (theme) => theme.customHeight.Body,
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography>Không tìm thấy mặt hàng nào theo yêu cầu</Typography>
            <Button
              variant="contained"
              sx={{ bgcolor: (theme) => theme.commonColors, color: "white" }}
              component={Link}
              to="/"
            >
              Trở về trang chủ
            </Button>
          </Box>
        </Container>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f5f5f5" }}>
      <Header showHeader={true} />
      <Container>
        {resultSearch?.length === 0 ? (
          <Box
            sx={{
              height: (theme) => theme.customHeight.Body,
              width: "100%",
              textAlign: "center",
            }}
          >
            <Typography sx={{ color: "black", m: "20px 0" }}>
              Không tìm thấy sản phẩm với từ khoá {value}
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
            <Box
              sx={{
                flexGrow: 1,
                p: "15px 0",
              }}
            >
              {resultSearch ? (
                <Grid container spacing={2}>
                  {resultSearch.map((item) => {
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
                            // p: 1,
                            bgcolor: "white",
                          }}
                          component={Link}
                          to={`/detail?id=${item?._id}`}
                        >
                          <img
                            src={item?.image[0]}
                            alt={item?.name}
                            style={{ width: "100%", border: "1px solid black" }}
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
                                alignItems: "center",
                              }}
                            >
                              <Typography>
                                {formatPrice(item?.price)}
                              </Typography>
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
