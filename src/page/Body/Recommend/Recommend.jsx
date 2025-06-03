import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { RecommendData } from "../../../Data/RecommenData";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/formatter";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../../../redux/slice/userInfoSlice";
import { getAllProduct, getAllProductUser } from "../../../api";
const Recommend = () => {
  const [optionSortPrice, setOptionSortPrice] = useState(false);
  const [change, setChange] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const userInfo = useSelector(userInfoSelector);

  const handleGetAllProduct = async () => {
    const res = await getAllProductUser();
    if (!res.error) {
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
        setChange(!change);
        break;
      case "CBA":
        setListProduct(
          listProduct.sort((a, b) => b.name.localeCompare(a.name))
        );
        setChange(!change);
        break;
      default:
        break;
    }
  };
  return (
    <Box>
      {/* <Stack direction={"row"} spacing={1}>
       
      </Stack> */}
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
          <Box sx={styleOption} onClick={() => handleSortPrice("ABC")}>
            A - Z
          </Box>
          <Box sx={styleOption} onClick={() => handleSortPrice("CBA")}>
            Z - A
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
        <Grid container spacing={2} sx={{ bgcolor: (theme) => theme.bgColor }}>
          {listProduct.map((item) => {
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
                    src={item?.image[0]}
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
    </Box>
  );
};

export default Recommend;
