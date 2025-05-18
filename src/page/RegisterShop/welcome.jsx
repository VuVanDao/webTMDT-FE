import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        my: 2,
        bgcolor: "white",
        textAlign: "center",
        py: 5,
      }}
    >
      <img
        src="https://deo.shopeesz.com/shopee/pap-admin-live-sg/upload/upload_9dab85081088531ee6d1aa958a90f55e.png"
        style={{ width: "200px" }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          my: 3,
        }}
      >
        <Typography sx={{ fontSize: "20px" }}>
          Chào mừng đến với Shopee!
        </Typography>
        <Typography sx={{ fontSize: "14px" }}>
          Vui lòng cung cấp thông tin để thành lập tài khoản người bán trên
          Shopee
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 3, bgcolor: (theme) => theme.commonColors }}
          onClick={() => navigate("/register_shop/step_1")}
        >
          Bắt đầu đăng kí
        </Button>
      </Box>
    </Container>
  );
};

export default Welcome;
