import { Box, Button, Divider } from "@mui/material";
import StepperExample from "../../../components/Stepper/StepperExample";
import { useNavigate } from "react-router-dom";

const FinalStep = () => {
  const navigate = useNavigate();

  // const validateBefore = (data) => {
  //   const condition = [
  //     "name",
  //     "address",
  //     "email",
  //     "phoneNumber",
  //     "delivery_type",
  //     "logo",
  //   ];
  //   condition.map((item) => {
  //     if (!data[item]) {
  //       return false;
  //     }
  //   });
  //   return true;
  // };

  return (
    <Box>
      <StepperExample activeStep={4} />
      <Divider sx={{ my: 3 }} />
      <Box sx={{ textAlign: "center", color: "black" }}>
        <p>Đăng kí thành công</p>
        <p>Hãy chờ đợi được yêu cầu được xét duyệt xét duyệt</p>
        <Button
          variant="contained"
          sx={{ bgcolor: (theme) => theme.commonColors, color: "white" }}
          onClick={() => navigate("/homePage")}
        >
          Trở về trang chủ
        </Button>
      </Box>
    </Box>
  );
};

export default FinalStep;
