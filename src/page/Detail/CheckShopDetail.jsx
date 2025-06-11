import {
  Container,
  CircularProgress,
  Box,
  Typography,
  Grid,
  Chip,
  Avatar,
  Divider,
  TablePagination,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { Link, useSearchParams } from "react-router-dom";

import Header from "../../components/Header";
import { getDetailShop } from "../../api";
import { formatPrice } from "../../utils/formatter";
import Footer from "../../components/Footer";
import MDEditor from "@uiw/react-md-editor";
const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(Number(timestamp));
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
const CheckShopDetail = () => {
  const [shopInfo, setShopInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  let [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const fetchShopInfo = async () => {
    setLoading(true);
    try {
      const res = await getDetailShop(id);
      setShopInfo(res[0]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchShopInfo();
  }, []);

  if (loading) {
    return (
      <Container sx={{ my: 3, bgcolor: (theme) => theme.whiteColor, p: 3 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!shopInfo) return null;
  return (
    <Box>
      <Header showHeader={true} />
      <Box
        sx={{
          bgcolor: "#f5f5f5",
          py: 3,
        }}
      >
        <Container
          sx={{
            my: 3,
            bgcolor: (theme) => theme.whiteColor,
            p: { xs: 1, sm: 3 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              alignItems: { xs: "center", md: "flex-start" },
              pl: { xs: 0, md: 10 },
            }}
          >
            {/* Shop Logo */}
            <Avatar
              src={shopInfo?.logo}
              alt={shopInfo?.name}
              sx={{
                width: 120,
                height: 120,
                mb: { xs: 2, md: 0 },
                boxShadow: 2,
              }}
            />
            {/* Shop Details */}
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  {shopInfo?.name}
                </Typography>
              </Box>

              <Grid container spacing={5}>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="body2" color="text.secondary">
                    Địa chỉ:
                  </Typography>
                  <Typography variant="body1">{shopInfo?.address}</Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="body2" color="text.secondary">
                    Số điện thoại:
                  </Typography>
                  <Typography variant="body1">
                    {shopInfo?.phoneNumber}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="body2" color="text.secondary">
                    Email:
                  </Typography>
                  <Typography variant="body1">{shopInfo?.email}</Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="body2" color="text.secondary">
                    Ngày tạo:
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(shopInfo?.createdAt)}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="body2" color="text.secondary">
                    Loại giao hàng:
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {shopInfo?.delivery_type?.map((type) => (
                      <Chip
                        key={type}
                        label={type}
                        color="primary"
                        size="small"
                      />
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="body2" color="text.secondary">
                    Số sản phẩm:
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {shopInfo?.products?.length}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Products List */}
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            1 số sản phẩm của shop
          </Typography>
          <Grid container spacing={2}>
            {shopInfo?.products?.length === 0 && (
              <Grid item xs={12}>
                <Typography color="text.secondary">
                  Chưa có sản phẩm nào.
                </Typography>
              </Grid>
            )}
            <Grid container spacing={3}>
              {shopInfo?.products
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
            <TablePagination
              component="div"
              count={shopInfo?.products?.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[6]}
            />
          </Grid>
        </Container>

        <Container sx={{ my: 3, bgcolor: (theme) => theme.whiteColor, p: 3 }}>
          <MDEditor.Markdown
            source={shopInfo?.description}
            style={{
              whiteSpace: "pre-wrap",
            }}
          />
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default CheckShopDetail;
