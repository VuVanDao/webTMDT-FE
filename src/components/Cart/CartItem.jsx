import React, { useState } from "react";
import { Box, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { data } from "../../Data/CartData";
import { formatPrice } from "../../utils/formatter";
const CartItem = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Tooltip
        title="Giỏ hàng"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <ShoppingCartIcon
          sx={{
            cursor: "pointer",
          }}
        />
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{ maxWidth: "450px" }}
      >
        {data &&
          data.cart.map((item) => {
            return (
              <MenuItem
                key={item.id}
                onClick={handleClose}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <img
                  src={item.image}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "5px",
                  }}
                />
                <Typography
                  sx={{
                    maxWidth: "60%",
                    overflowX: "hidden",
                    fontSize: "14px",
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                  }}
                >
                  {formatPrice(item.price)}
                </Typography>
              </MenuItem>
            );
          })}
      </Menu>
    </Box>
  );
};

export default CartItem;
