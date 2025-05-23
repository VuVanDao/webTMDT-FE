import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { formatPrice } from "../../../../utils/formatter";
import { Rating } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState } from "react";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ModalDetailProduct = ({
  handleOpenModalDetail,
  open,
  detailProduct,
}) => {
  const [size, setSize] = useState("");
  const [SelectQuantity, setSelectQuantity] = useState(1);
  const [Category, setCategory] = useState("");
  //   console.log("🚀 ~ detailProduct:", detailProduct);
  const handleClose = () => handleOpenModalDetail();
  const handleDecrement = () => {
    const newQuantity = SelectQuantity - 1;
    setSelectQuantity(newQuantity);
  };
  const handleIncrement = () => {
    const newQuantity = SelectQuantity + 1;
    setSelectQuantity(newQuantity);
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
          <Box sx={{ bgcolor: "white", color: "black", p: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <Box
                sx={{
                  width: "500px",
                  height: "500px",
                }}
              >
                <img
                  src={
                    detailProduct?.image?.length > 0
                      ? detailProduct?.image[0]
                      : null
                  }
                  alt={detailProduct?.name}
                  style={{ width: "100%", border: "1px solid" }}
                />
              </Box>

              <Box>
                <Typography variant="h6">{detailProduct?.name}</Typography>

                {/* Gia ca */}
                <Box sx={{ p: 2, bgcolor: "#f5f5f5", color: "red", mt: 3 }}>
                  <Typography variant="h5">
                    {formatPrice(detailProduct?.price)}
                  </Typography>
                </Box>

                {/* delivery */}
                <Box sx={{ display: "flex", mt: 3, width: "500px" }}>
                  <Box sx={{ color: "#757575", width: "20%" }}>Vận chuyển</Box>
                  <Box>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        cursor: "pointer",
                        mb: 1,
                      }}
                    >
                      Vận chuyển vào hôm nay
                      <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />
                    </Typography>

                    <Typography>Miễn phí vận chuyển</Typography>

                    <Typography
                      sx={{ fontSize: "12px", mt: 1, color: "#757575" }}
                    >
                      Tặng Voucher ₫15.000 nếu đơn giao sau thời gian trên.
                    </Typography>
                  </Box>
                </Box>

                {/* phan loai */}
                <Box sx={{ display: "flex", mt: 3, width: "100%" }}>
                  <Box sx={{ color: "#757575", width: "20%" }}>
                    {detailProduct?.categoryId?.length > 0 && "Phân loại"}
                  </Box>
                  <Box sx={{ display: "flex", gap: 3 }}>
                    {detailProduct?.categoryId?.map((item) => {
                      if (item.name === Category) {
                        return (
                          <Box
                            key={item.id}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              cursor: "pointer",
                              mb: 1,
                              border: "1px solid red",
                              p: "5px",
                            }}
                            // onClick={() => {
                            //   setDisplayImage(item.image);
                            //   setSelectColor(item.name);
                            // }}
                          >
                            <img
                              src={item?.image}
                              alt={item?.name}
                              style={{ width: "30px", height: "30px" }}
                            />
                            <Typography>{item?.name}</Typography>
                          </Box>
                        );
                      } else {
                        return (
                          <Box
                            key={item?.id}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              cursor: "pointer",
                              mb: 1,
                              border: "1px solid #757575",
                              p: "5px",
                            }}
                            // onClick={() => {
                            //   setDisplayImage(item.image);
                            //   setSelectColor(item.name);
                            // }}
                          >
                            <img
                              src={item?.image}
                              alt={item?.name}
                              style={{ width: "30px", height: "30px" }}
                            />
                            <Typography>{item?.name}</Typography>
                          </Box>
                        );
                      }
                    })}
                  </Box>
                </Box>

                {/* kich co */}
                <Box sx={{ display: "flex", mt: 3, width: "100%" }}>
                  <Box sx={{ color: "#757575", width: "20%" }}>
                    {detailProduct?.size?.length > 0 && "Kích cỡ"}
                  </Box>
                  <Box sx={{ display: "flex", gap: 3 }}>
                    {detailProduct?.size?.map((item) => {
                      if (item === size) {
                        return (
                          <Box
                            key={item?._id}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              cursor: "pointer",
                              mb: 1,
                              border: "1px solid red",
                              p: "5px 10px",
                            }}
                            // onClick={() => {
                            //   setSize(item);
                            // }}
                          >
                            <Typography>{item}</Typography>
                          </Box>
                        );
                      } else {
                        return (
                          <Box
                            key={item?._id}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              cursor: "pointer",
                              mb: 1,
                              border: "1px solid #757575",
                              p: "5px 10px",
                            }}
                            // onClick={() => {
                            //   setSize(item);
                            // }}
                          >
                            <Typography variant="caption">{item}</Typography>
                          </Box>
                        );
                      }
                    })}
                  </Box>
                </Box>

                {/* so luong */}
                <Box sx={{ display: "flex", mt: 3, width: "100%" }}>
                  <Box sx={{ color: "#757575", width: "20%" }}>Số lượng</Box>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        cursor: "pointer",
                        mb: 1,
                        border: "1px solid #757575",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        sx={{
                          color: (theme) => theme.commonColors,
                          border: "1px solid ",
                          borderColor: "transparent",
                          borderRightColor: "#757575",
                          borderRadius: "0px",
                        }}
                        onClick={() => {
                          if (SelectQuantity > 1) {
                            handleDecrement();
                          } else if (SelectQuantity === 1) {
                            toast.error("Vui lòng chọn ít nhất 1 sản phẩm");
                          }
                        }}
                      >
                        -
                      </Button>
                      <Typography
                        sx={{ color: (theme) => theme.commonColors, mx: 2 }}
                      >
                        {SelectQuantity}
                      </Typography>
                      <Button
                        sx={{
                          color: (theme) => theme.commonColors,
                          border: "1px solid ",
                          borderColor: "transparent",
                          borderLeftColor: "#757575",
                          borderRadius: "0px",
                        }}
                        onClick={() => {
                          if (
                            SelectQuantity <
                            detailProduct?.quantity - detailProduct?.sold
                          ) {
                            handleIncrement();
                          } else if (
                            SelectQuantity ===
                            detailProduct?.quantity - detailProduct?.sold
                          ) {
                            toast.error(`Vượt quá số lượng có sẵn`);
                          }
                        }}
                      >
                        +
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      <Typography>
                        Số lượng có sẵn:{" "}
                        {detailProduct?.quantity - detailProduct?.sold}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
