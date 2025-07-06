import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useConfirm } from "material-ui-confirm";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { useDispatch, useSelector } from "react-redux";

import Header from "../Header";
import Footer from "../Footer";
import { clearData } from "../../redux/slice/dataFromRegisterShopSlice";
import { userInfoSelector } from "../../redux/slice/userInfoSlice";
import {
  cancelRegisterShop,
  getDetailShopByOwner,
} from "../../api/shopAPI/shopAPI";

const FormRegisterOpenShop = () => {
  const [data, setData] = useState({});
  const userInfo = useSelector(userInfoSelector);
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCancelRegister = async () => {
    const { confirmed, reason } = await confirm({
      title: "Xác nhận huỷ đang kí",
    });
    if (confirmed) {
      dispatch(clearData());
      cancelRegisterShop(data?._id).then((res) => {
        if (!res?.error) {
          navigate("/");
        } else {
          toast.error(res);
        }
      });
    }
  };
  const handleFindFormRegister = () => {
    getDetailShopByOwner(userInfo?._id).then((res) => {
      setData(res);
    });
  };
  useEffect(() => {
    if (!userInfo?.sentForm) {
      navigate("/");
    }
    handleFindFormRegister();
  }, []);
  return (
    <Box sx={{ bgcolor: (theme) => theme.bgColor }}>
      <Header showHeader={true} />
      <Container sx={{ p: 3, my: 3, bgcolor: "white" }}>
        <Typography variant="h6">Thông tin shop đã đăng kí</Typography>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Box sx={{ width: "100%" }}>
            <Avatar
              src={data?.logo}
              sx={{ margin: "0 auto", width: "150px", height: "150px" }}
              alt={data?.name}
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography>Thông tin cơ bản</Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <ul>
              <li>Tên: {data?.name}</li>
              <li>Số điện thoại: {data?.phoneNumber}</li>
              <li>Địa chỉ: {data?.address}</li>
              <li>Trạng thái: {data?.status}</li>
              <li>Loại shop: {data?.shopType}</li>
            </ul>

            <Box>
              Phương thức vận chuyển:
              {data?.delivery_type?.map((type) => (
                <Chip key={type} label={type} color="primary" size="small" />
              ))}
            </Box>
          </Box>

          <Typography>Miêu tả</Typography>

          <MDEditor.Markdown
            source={data?.description}
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
