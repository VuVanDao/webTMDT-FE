import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelData,
  DataFormRegisterShopSelector,
} from "../../redux/slice/dataFromRegisterShopSlice";
import MDEditor from "@uiw/react-md-editor";
import { useConfirm } from "material-ui-confirm";
import { useNavigate } from "react-router-dom";

const FormRegisterOpenShop = () => {
  const dataFormRegisterShop = useSelector(DataFormRegisterShopSelector);
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCancelRegister = async () => {
    const { confirmed, reason } = await confirm({
      title: "Xác nhận huỷ đang kí",
    });
    if (confirmed) {
      dispatch(cancelData());
      navigate("/");
    }
  };
  return (
    <Box sx={{ bgcolor: (theme) => theme.bgColor }}>
      <Header showHeader={true} />
      <Container sx={{ p: 3, my: 3, bgcolor: "white" }}>
        <Typography variant="h6">Thông tin shop đã đăng kí</Typography>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Box sx={{ width: "100%" }}>
            <Avatar
              src={dataFormRegisterShop?.image}
              sx={{ margin: "0 auto", width: "150px", height: "150px" }}
              alt={dataFormRegisterShop?.name}
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography>Thông tin cơ bản</Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 30,
            }}
          >
            <Typography>Tên: {dataFormRegisterShop?.name}</Typography>
            <Typography>
              Số điện thoại: {dataFormRegisterShop?.phoneNumber}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 25,
              my: 3,
            }}
          >
            <Typography>Địa chỉ: {dataFormRegisterShop?.address}</Typography>
            <Box>
              Phương thức vận chuyển:
              {dataFormRegisterShop?.delivery_type?.map((type) => (
                <Chip key={type} label={type} color="primary" size="small" />
              ))}
            </Box>
          </Box>

          <Typography>Miêu tả</Typography>

          <MDEditor.Markdown
            source={dataFormRegisterShop?.description}
            style={{
              whiteSpace: "pre-wrap",
            }}
          />
        </Box>
        <Box sx={{ width: "100%", textAlign: "center", mt: 3 }}>
          <Button
            variant="contained"
            sx={{ bgcolor: (theme) => theme.commonColors }}
            onClick={handleCancelRegister}
          >
            Huỷ đăng kí
          </Button>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default FormRegisterOpenShop;
