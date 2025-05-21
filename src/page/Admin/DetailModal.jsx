import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";

export const DetailModal = ({
  openModal,
  setOpenModal,
  dataDetailShop,
  setDataDetailShop,
}) => {
  const handleClose = () => {
    setDataDetailShop(null);
    setOpenModal(!openModal);
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "relative",
            width: 900,
            maxWidth: 900,
            bgcolor: "white",
            boxShadow: 24,
            borderRadius: "8px",
            border: "none",
            outline: 0,
            padding: "40px 20px 20px",
            margin: "50px auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "12px",
              right: "10px",
              cursor: "pointer",
            }}
          >
            <CancelIcon
              color="error"
              sx={{ "&:hover": { color: "error.light" } }}
              onClick={handleClose}
            />
          </Box>
          {dataDetailShop?.logo && (
            <Box sx={{ mb: 4 }}>
              <img
                style={{
                  width: "100%",
                  height: "320px",
                  borderRadius: "6px",
                  objectFit: "cover",
                }}
                src={dataDetailShop?.logo}
                alt="card-cover"
              />
            </Box>
          )}

          <Box
            sx={{
              mb: 1,
              mt: -3,
              pr: 2.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h5">
              Tên shop:{dataDetailShop?.name}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
