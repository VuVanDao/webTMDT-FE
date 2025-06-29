import { Box, Button, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import StepperExample from "../../../components/Stepper/StepperExample";
import CustomInputFile from "../../../components/customInputFile/customInputFile";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { singleFileValidator } from "../../../utils/valiodatorFile";
import {
  clearData,
  DataFormRegisterShopSelector,
  updateDataFormRegisterShopStep3,
} from "../../../redux/slice/dataFromRegisterShopSlice";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";
import { registerShop, registerShopLogo } from "../../../api";
import {
  sentFormRegister,
  userInfoSelector,
} from "../../../redux/slice/userInfoSlice";
import axios from "axios";
import PageLoadingSpinner from "../../../components/Loading/PageLoadingSpinner";

const Step_3 = () => {
  const [logoImage, setLogoImage] = useState(null);
  const [logoImageForSend, setLogoImageForSend] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const confirmRegister = useConfirm();

  const dataFormRegisterShop = useSelector(DataFormRegisterShopSelector);
  const userInfo = useSelector(userInfoSelector);

  const validateBefore = (data) => {
    if (!data) return false;
    const condition = [
      "name",
      "address",
      "email",
      "phoneNumber",
      "delivery_type",
      "description",
    ];
    condition.map((item) => {
      if (!data[item]) {
        return false;
      }
    });
    return true;
  };

  const handleChangeLogoImage = (event) => {
    const err = singleFileValidator(event.target?.files[0]);
    if (err) {
      toast.error(err);
      return;
    }
    setLogoImage(URL.createObjectURL(event.target?.files[0]));
    setLogoImageForSend(event.target?.files[0]);
  };
  const handleSendLogoShop = async () => {
    setLoading(true);
    let reqData = new FormData();
    reqData.append("file", logoImageForSend);
    reqData.append("upload_preset", "ReactUpload");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dlb4ooi7n/upload",
      reqData
    );
    if (res) {
      return res.data.secure_url;
    }
    return null;
  };
  const sendFormRegister = async (ownerId) => {
    const result = await handleSendLogoShop();
    dispatch(updateDataFormRegisterShopStep3(result));
    const data = {
      ...dataFormRegisterShop,
      ownerId: ownerId,
      logo: result,
    };
    toast
      .promise(registerShop(data), { pending: "Đang gửi thông tin" })
      .then((res) => {
        if (!res.error) {
          setLogoImage(null);
          setLogoImageForSend(null);
          dispatch(clearData());
          dispatch(sentFormRegister());
          setLoading(false);
          navigate("/register_shop/final_step");
        }
      });
  };

  const handleConfirmLogo = async () => {
    const { confirmed, reason } = await confirmRegister({
      description: "Sau khi gửi sẽ không thay đổi được thông tin",
      title: "Xác nhận đăng kí cửa hàng",
    });

    if (confirmed) {
      const ownerId = userInfo._id;
      await sendFormRegister(ownerId);
    }
  };
  useEffect(() => {
    if (!validateBefore(dataFormRegisterShop)) {
      navigate("/register_shop/step_2_extra");
    }
  }, []);
  useEffect(() => {}, [logoImage]);

  if (loading) {
    return <PageLoadingSpinner />;
  } else
    return (
      <Box>
        <StepperExample activeStep={3} />
        <Divider sx={{ my: 3 }} />

        {/* logo */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "black",
          }}
        >
          <Typography mb={2}>Logo shop</Typography>
          <Box sx={{ border: "1px solid", p: 5 }} component={"label"}>
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
                color: "white",
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
