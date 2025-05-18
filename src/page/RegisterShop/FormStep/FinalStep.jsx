import { Box, Button, Divider } from "@mui/material";
import React, { useEffect } from "react";
import StepperExample from "../../../components/Stepper/StepperExample";
import { useSelector } from "react-redux";
import { DataFormRegisterShopSelector } from "../../../redux/slice/dataFromRegisterShopSlice";
import { useNavigate } from "react-router-dom";
import { registerShop } from "../../../api";

const FinalStep = () => {
  const navigate = useNavigate();
  const dataFormRegisterShop = useSelector(DataFormRegisterShopSelector);
  const validateBefore = (data) => {
    const condition = [
      "name",
      "address",
      "email",
      "phoneNumber",
      "delivery_type",
      "logo",
    ];
    condition.map((item) => {
      if (!data[item]) {
        return false;
      }
    });
    return true;
  };
  const sendFormRegister = async (ownerId) => {
    console.log("🚀 ~ sendFormRegister ~ ownerId:", ownerId);

    const res = await registerShop({
      ...dataFormRegisterShop,
      ownerId: ownerId,
    });
    console.log("🚀 ~ handleConfirmLogo ~ res:", res);
  };
  useEffect(() => {
    if (!validateBefore(dataFormRegisterShop)) {
      navigate("/register_shop/step_2");
    }
    const ownerId = JSON.parse(localStorage.getItem("userInfo"))._id;

    sendFormRegister(ownerId);
  }, []);
  return (
    <Box>
      <StepperExample activeStep={3} />
      <Divider sx={{ my: 3 }} />
      <Box sx={{ textAlign: "center" }}>
        <p>Đăng kí thành công</p>
        <p>Hãy chờ đợi được yêu cầu được xét duyệt xét duyệt</p>
        <Button
          variant="contained"
          sx={{ bgcolor: (theme) => theme.commonColors }}
          onClick={() => navigate("/homePage")}
        >
          Trở về trang chủ
        </Button>
      </Box>
    </Box>
  );
};

export default FinalStep;
