import React, { useState } from "react";
import { Box, Typography, Grid, TablePagination } from "@mui/material";
import { formatPrice } from "../../../../utils/formatter";
import { Link } from "react-router-dom";

const List_product_tab = ({ shopInfoProducts }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Box>
      {/* Products List */}
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        1 số sản phẩm của shop
      </Typography>
      <Grid container spacing={2}>
        {shopInfoProducts?.length === 0 && (
          <Grid item xs={12}>
            <Typography color="text.secondary">
              Chưa có sản phẩm nào.
            </Typography>
          </Grid>
        )}
        <Grid container spacing={3}>
          {shopInfoProducts
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
                      style={{
                        width: "100%",
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
          count={shopInfoProducts?.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[12, 18, 24]}
        />
      </Grid>
    </Box>
  );
};

export default List_product_tab;
