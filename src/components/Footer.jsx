import { Box, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { detail } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // hoặc behavior: "smooth"
  }, [detail]);
  return (
    <Box
      sx={{
        height: (theme) => theme.customHeight.Footer,
        bgcolor: "white",
        color: "black",
      }}
    >
      <Container>
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Box
            sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 2 }}
          >
            <Box>Chính sách bảo mật</Box>
            <Box>Quy chế bảo mật</Box>
            <Box>Chính sách vận chuyển</Box>
            <Box>Chính sách trả hàng và hoàn tiền</Box>
          </Box>
          <Typography sx={{ fontSize: "12px", mb: 3 }}>
            Công ty TNHH Shopee
          </Typography>
          <Typography sx={{ fontSize: "12px", mb: 3 }}>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai,
            Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt Nam. Chăm
            sóc khách hàng: Gọi tổng đài Shopee (miễn phí) hoặc Trò chuyện với
            Shopee ngay trên Trung tâm trợ giúp
          </Typography>
          <Typography sx={{ fontSize: "12px", mb: 3 }}>
            Chịu Trách Nhiệm Quản Lý Nội Dung: Vũ Văn Đạo
          </Typography>
          <Typography sx={{ fontSize: "12px", mb: 1 }}>
            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch và Đầu tư TP Hà Nội
            cấp lần đầu ngày 10/02/2015
          </Typography>
          <Typography sx={{ fontSize: "12px" }}>
            © 2015 - Bản quyền thuộc về Công ty TNHH Shopee
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
