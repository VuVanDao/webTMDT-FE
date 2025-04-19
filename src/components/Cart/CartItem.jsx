import React, { useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
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
        sx={{
          maxWidth: "450px",
        }}
      >
        <Typography
          sx={{
            pl: 2,
            pb: 1,
            fontSize: "14px",
          }}
        >
          Sản phẩm mới thêm
        </Typography>
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
        <Box
          sx={{
            px: 2,
            // py: 1,
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
            }}
          >
            5 sản phẩm có sẵn trong giỏ
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: (theme) => theme.commonColors,
              color: "white",
              fontSize: "12px",
            }}
          >
            Xem giỏ hàng
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default CartItem;
