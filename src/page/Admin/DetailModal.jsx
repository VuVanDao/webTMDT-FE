import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import { Avatar } from "@mui/material";
import { Lightbox } from "yet-another-react-lightbox";
import { browseShop } from "../../api";
import { toast } from "react-toastify";
import MDEditor from "@uiw/react-md-editor";
export const DetailModal = ({
  openModal,
  setOpenModal,
  dataDetailShop,
  setDataDetailShop,
  handleGetAllShop,
}) => {
  const handleClose = () => {
    setDataDetailShop(null);
    setOpenModal(!openModal);
  };
  const [open, setOpen] = React.useState(false);
  const handleBrowseShop = async (data) => {
    const res = await browseShop({
      selection: data,
      shopId: dataDetailShop._id,
    });
    if (!res.error) {
      toast.success("Đã duyệt");
      handleGetAllShop();
      setOpenModal(!openModal);
    }
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
            backgroundColor: "#fff",
            overflowY: "auto",
            maxHeight: "90vh",
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
                  height: "220px",
                  borderRadius: "6px",
                  objectFit: "cover",
                }}
                src={dataDetailShop?.logo}
                alt="card-cover"
                onClick={() => setOpen(true)}
              />
            </Box>
          )}

          <Box
            sx={{
              mb: 1,
              mt: -3,
              pr: 2.5,
              display: "flex",
              // alignItems: "center",
              gap: 1,
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" color="black">
              Tên shop: {dataDetailShop?.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
              color="black"
            >
              Tên chủ sở hữu: &nbsp;
              <Typography
                variant="span"
                sx={{
                  fontWeight: "bold",
                  "&:hover": { color: "#fdba26" },
                  cursor: "pointer",
                }}
              >
                {dataDetailShop?.Owner[0]?.username}
              </Typography>
              &nbsp;
              <Avatar src={dataDetailShop?.Owner[0]?.avatar} />
            </Box>
            <Typography color="black">
              Email: {dataDetailShop?.Owner[0]?.email}
            </Typography>
            <Typography color="black">
              Số điện thoại: {dataDetailShop?.phoneNumber}
            </Typography>
            <Typography color="black">
              Địa chỉ lấy hàng: {dataDetailShop?.address}
            </Typography>
            <Typography color="black">
              Miêu tả:
              <MDEditor.Markdown source={dataDetailShop?.description} />
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              bgcolor: (theme) => theme.bgColor,
              borderRadius: "5px",
              p: 2,
              textAlign: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                mr: 5,
                bgcolor: (theme) => theme.commonColors,
                color: "white",
              }}
              onClick={() => handleBrowseShop("accept")}
            >
              Chấp nhận
            </Button>
            <Button
              variant="contained"
              onClick={() => handleBrowseShop("denied")}
            >
              Từ chối
            </Button>
          </Box>
        </Box>
      </Modal>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: dataDetailShop?.logo }]}
      />
    </div>
  );
};
