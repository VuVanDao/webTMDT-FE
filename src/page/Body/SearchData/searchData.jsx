import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { RecommendData } from "../../../Data/RecommenData";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { formatPrice } from "../../../utils/formatter";

const SearchData = () => {
  const [data, setData] = useState([]);
  let [searchParams] = useSearchParams();
  const { value } = Object.fromEntries([...searchParams]);
  const removeVietnameseTones = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };
  const searchSuggestions = (input) => {
    const keyword = removeVietnameseTones(input.toLowerCase());
    return RecommendData.filter((item) =>
      removeVietnameseTones(item.name.toLowerCase()).includes(keyword)
    );
  };
  useEffect(() => {
    if (value) {
      const result = searchSuggestions(value);
      if (result) setData(result);
    }
  }, [value]);
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
        {data?.length === 0 ? (
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
              flexGrow: 1,
              p: 3,
            }}
          >
            {data ? (
              <Grid container spacing={2}>
                {data.map((item) => {
                  return (
                    <Grid
                      size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
                      key={item.id}
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
                        to={`/detail?id=${item.id}`}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
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
                            <Typography>{formatPrice(item?.price)}</Typography>
                            <Typography sx={{ fontSize: "14px" }}>
                              Đã bán: 10
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
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default SearchData;
