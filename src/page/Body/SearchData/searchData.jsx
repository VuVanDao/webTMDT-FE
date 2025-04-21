import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { RecommendData } from "../../../Data/RecommenData";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

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
  useEffect(() => {
    if (value) {
      const result = searchSuggestions(value);
      if (result) setData(result);
      console.log("🚀 ~ useEffect ~ result:", data);
    }
  }, []);

  return (
    <Box sx={{ bgcolor: "#f5f5f5" }}>
      <Header showHeader={true} />
      <Container>
        <Box
          sx={{
            flexGrow: 1,
            height: (theme) => theme.customHeight.Body,
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
                          borderColor: "rgba(0, 0, 0, .12)",
                          boxShadow: "0 0 .8125rem 0 rgba(0, 0, 0, .05)",
                          transform: "translateZ(0)",
                        },
                        overflow: "hidden",
                        p: 1,
                      }}
                      component={Link}
                      to={`/detail?id=${item.id}`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "100%" }}
                      />
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
      </Container>
      <Footer />
    </Box>
  );
};

export default SearchData;
