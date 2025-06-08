import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { Avatar, Rating, Tooltip } from "@mui/material";
import { formatPrice } from "../../../utils/formatter";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Comment from "../../../components/Comment/Comment";
import moment from "moment/moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: "auto",
  width: "1000px",
};

export const ModalEvaluateProduct = ({
  open,
  setOpen,
  itemToEvaluate,
  handleGetAllShopOrder,
}) => {
  const [item, setItem] = useState({});
  useEffect(() => {
    const handleGetProductById = async () => {
      //   await getProductById(itemToEvaluate).then((res) => {
      //     if (!res.error) {
      //       setItem(res);
      //     }
      //   });
      setItem(itemToEvaluate);
    };
    if (itemToEvaluate) {
      handleGetProductById();
    }
  }, [itemToEvaluate]);
  const handleClose = () => {
    setOpen(false);
    handleGetAllShopOrder();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
            }}
          >
            {/* right */}
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <img
                src={item?.image}
                alt={item?.name}
                style={{ width: "200px", height: "200px", border: "1px solid" }}
              />
            </Box>

            {/* left */}
            <Box sx={{ width: "700px" }}>
              {/* name */}
              <Box>
                <Tooltip title="click to update">
                  <Typography variant="h6">{item?.name}</Typography>
                </Tooltip>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}
                >
                  <Typography color="rgba(0, 0, 0, .54)" variant="body2">
                    Phân loại hàng: {item?.category}{" "}
                    {item?.size ? `kích cỡ: ${item?.size}` : ""}
                  </Typography>
                </Box>
              </Box>
              {/* Shop info */}
              <Box
                sx={{ display: "flex", gap: 3, mt: 2, alignItems: "center" }}
              >
                <Typography color="#757575">Tên shop:</Typography>
                <Typography variant="button" color="black">
                  {item?.ShopInfo?.map((item) => item?.name)}
                </Typography>

                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<StorefrontIcon />}
                  sx={{ borderColor: "rgba(0, 0, 0, .09)", color: "#555" }}
                >
                  Xem Shop
                </Button>
              </Box>
              {/* price */}
              <Box
                sx={{
                  p: 2,
                  bgcolor: "#f5f5f5",
                  color: "red",
                  mt: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                {/* so luong */}
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Box
                    sx={{
                      color: "#757575",
                      cursor: "pointer",
                    }}
                  >
                    Số lượng đặt mua
                  </Box>
                  <Typography> ( {item?.quantity} chiếc):</Typography>
                </Box>
                {/* gia tien */}
                <Typography variant="h6">{formatPrice(item?.price)}</Typography>
              </Box>
              {(item?.comments?.length === 0 || !item?.comments) && (
                <Comment
                  productId={item?.productId}
                  orderId={item?._id}
                  handleClose={handleClose}
                />
              )}
              {item?.comments?.length >= 1 &&
                item?.comments &&
                item?.comments?.map((item, index) => (
                  <Box
                    sx={{ display: "flex", gap: 1, width: "100%", mb: 1.5 }}
                    key={index}
                  >
                    <Tooltip title={item?.username}>
                      <Avatar
                        sx={{ width: 36, height: 36, cursor: "pointer" }}
                        alt={item?.username}
                        src={item?.userAvatar}
                      />
                    </Tooltip>
                    <Box sx={{ width: "inherit" }}>
                      <Typography
                        variant="span"
                        sx={{ fontWeight: "bold", mr: 1 }}
                      >
                        {item?.username}
                      </Typography>

                      <Typography variant="span" sx={{ fontSize: "12px" }}>
                        {moment(item?.commentAt).format("llll")}
                      </Typography>

                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        Đánh giá:
                        <Rating
                          defaultValue={item?.rating}
                          size="small"
                          readOnly
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "block",
                          bgcolor: (theme) =>
                            theme.palette.mode === "dark" ? "#33485D" : "white",
                          p: "8px 12px",
                          mt: "4px",
                          border: "0.5px solid rgba(0, 0, 0, 0.2)",
                          borderRadius: "4px",
                          wordBreak: "break-word",
                          boxShadow: "0 0 1px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        {item?.commentContent}
                      </Box>
                    </Box>
                  </Box>
                ))}
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
