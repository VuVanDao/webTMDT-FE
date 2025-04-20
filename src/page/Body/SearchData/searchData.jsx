import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { RecommendData } from "../../../Data/RecommenData";
import { Box, Container, Grid } from "@mui/material";
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
  useEffect(() => {
    if (value) {
      const result = searchSuggestions(value);
      setData(result);
      console.log("🚀 ~ useEffect ~ result:", result);
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
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default SearchData;
