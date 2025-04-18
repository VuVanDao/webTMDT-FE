import React from "react";
import { Popover, Typography } from "@mui/material";
import qrImage from "../../assets/qr.png";
import { CardMedia } from "@mui/material";
const QrShope = ({ anchorEl, setAnchorEl }) => {
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return (
    <Popover
      id="mouse-over-popover"
      sx={{ pointerEvents: "none" }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      <Typography sx={{ p: 1 }}>
        <CardMedia component="img" src={qrImage} height={"120px"} />
      </Typography>
    </Popover>
  );
};

export default QrShope;
