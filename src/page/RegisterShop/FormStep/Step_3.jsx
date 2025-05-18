import { Box, Button, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import StepperExample from "../../../components/Stepper/StepperExample";
import CustomInputFile from "../../../components/customInputFile/customInputFile";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { singleFileValidator } from "../../../utils/valiodatorFile";
import {
  DataFormRegisterShopSelector,
  updateDataFormRegisterShopStep3,
} from "../../../redux/slice/dataFromRegisterShopSlice";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";

const Step_3 = () => {
  const [logoImage, setLogoImage] = useState(null);
  const [logoImageForSend, setLogoImageForSend] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const confirmRegister = useConfirm();

  const dataFormRegisterShop = useSelector(DataFormRegisterShopSelector);

  const validateBefore = (data) => {
    const condition = [
      "name",
      "address",
      "email",
      "phoneNumber",
      "delivery_type",
    ];
    condition.map((item) => {
      if (!data[item]) {
        return false;
      }
    });
    return true;
  };
  useEffect(() => {
    if (!validateBefore(dataFormRegisterShop)) {
      navigate("/register_shop/step_2");
    }
    if (dataFormRegisterShop?.logo) {
      setLogoImage(dataFormRegisterShop?.logo);
    }
  }, []);
  const handleChangeLogoImage = (event) => {
    const err = singleFileValidator(event.target?.files[0]);
    if (err) {
      toast.error(err);
      return;
    }
    setLogoImage(URL.createObjectURL(event.target?.files[0]));
    setLogoImageForSend(event.target?.files[0]);
  };
  const handleConfirmLogo = async () => {
    const { confirmed, reason } = await confirmRegister({
      description: "Sau khi gửi sẽ không thay đổi được thông tin",
      title: "Xác nhận đăng kí cửa hàng",
    });

    if (confirmed) {
      navigate("/register_shop/final_step");
      dispatch(updateDataFormRegisterShopStep3(logoImage));
    }
  };

  return (
    <Box>
      <StepperExample activeStep={2} />
      <Divider sx={{ my: 3 }} />

      {/* logo */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography mb={2}>Logo shop</Typography>
        <Box
          sx={{ border: "1px solid", width: "100%", p: 5 }}
          component={"label"}
        >
          <img
            src={logoImage}
            style={{ width: "250px" }}
            alt={logoImageForSend?.name}
          />
          <CustomInputFile type="file" onChange={handleChangeLogoImage} />
        </Box>
        <Box>
          <Button
            variant="contained"
            sx={{
              bgcolor: (theme) => theme.commonColors,
              cursor: "pointer",
              my: 3,
            }}
            onClick={handleConfirmLogo}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Step_3;
