import {
  StepConnector,
  Container,
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import StepperExample from "../../../components/Stepper/StepperExample";
import { useForm } from "react-hook-form";
import {
  DataFormRegisterShopSelector,
  updateDataFormRegisterShopStep1,
} from "../../../redux/slice/dataFromRegisterShopSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PHONE_RULE,
  PHONE_RULE_MESSAGE,
} from "../../../utils/constants";
const CustomTextField = styled(TextField)(({ theme }) => ({
  "& input": {
    height: "1px",
    width: "500px",
    color: "black",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ccc",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
}));

const boxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 5,
  width: "100%",
  //   border: "1px solid",
  color: "black",
};

const Step_1 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { email, phoneNumber } = JSON.parse(localStorage.getItem("userInfo"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataFormRegisterShop = useSelector(DataFormRegisterShopSelector);

  const onSubmit = (data) => {
    dispatch(
      updateDataFormRegisterShopStep1({
        ...data,
      })
    );
    navigate("/register_shop/step_2");
  };

  return (
    <Box>
      <StepperExample activeStep={0} />
      <Divider sx={{ my: 3 }} />
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              width: "100%",
            }}
          >
            {/* ten shop */}
            <Box sx={boxStyle}>
              <Typography variant="body2" component="label" width={"15%"}>
                <span
                  style={{
                    color: "red",
                    fontSize: "0.75em",
                    verticalAlign: "top",
                  }}
                >
                  *
                </span>
                Tên Shop
              </Typography>
              <Box>
                <CustomTextField
                  error={errors.name}
                  {...register("name", {
                    required: "This field is required.",
                  })}
                  defaultValue={dataFormRegisterShop?.name}
                />
                {errors.name && (
                  <Alert
                    severity="error"
                    sx={{
                      mt: "0.7em",
                      ".MuiAlert-message": { overflow: "hidden" },
                    }}
                  >
                    {errors.name.message}
                  </Alert>
                )}
              </Box>
            </Box>

            {/* dia chi lay hang */}
            <Box sx={boxStyle}>
              <Typography variant="body2" component="label" width={"15%"}>
                <span
                  style={{
                    color: "red",
                    fontSize: "0.75em",
                    verticalAlign: "top",
                  }}
                >
                  *
                </span>
                Địa chỉ lấy hàng
              </Typography>
              <Box>
                <CustomTextField
                  error={errors.address}
                  {...register("address", {
                    required: "This field is required.",
                  })}
                  defaultValue={dataFormRegisterShop?.address}
                />
                {errors.address && (
                  <Alert
                    severity="error"
                    sx={{
                      mt: "0.7em",
                      ".MuiAlert-message": { overflow: "hidden" },
                    }}
                  >
                    {errors.address.message}
                  </Alert>
                )}
              </Box>
            </Box>

            {/* email */}
            <Box sx={boxStyle}>
              <Typography variant="body2" component="label" width={"15%"}>
                <span
                  style={{
                    color: "red",
                    fontSize: "0.75em",
                    verticalAlign: "top",
                  }}
                >
                  *
                </span>
                Email
              </Typography>
              <Box>
                <CustomTextField
                  defaultValue={email}
                  error={errors.email}
                  {...register("email", {
                    required: "This field is required.",
                    pattern: {
                      value: EMAIL_RULE,
                      message: EMAIL_RULE_MESSAGE,
                    },
                  })}
                />
                {errors.email && (
                  <Alert
                    severity="error"
                    sx={{
                      mt: "0.7em",
                      ".MuiAlert-message": { overflow: "hidden" },
                    }}
                  >
                    {errors.email.message}
                  </Alert>
                )}
              </Box>
            </Box>

            {/* sđt */}
            <Box sx={boxStyle}>
              <Typography variant="body2" component="label" width={"15%"}>
                <span
                  style={{
                    color: "red",
                    fontSize: "0.75em",
                    verticalAlign: "top",
                  }}
                >
                  *
                </span>
                Số điện thoại
              </Typography>
              <Box>
                <CustomTextField
                  defaultValue={
                    dataFormRegisterShop?.phoneNumber
                      ? dataFormRegisterShop?.phoneNumber
                      : phoneNumber
                  }
                  error={errors.phoneNumber}
                  {...register("phoneNumber", {
                    required: "This field is required.",
                    pattern: {
                      value: PHONE_RULE,
                      message: PHONE_RULE_MESSAGE,
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <Alert
                    severity="error"
                    sx={{
                      mt: "0.7em",
                      ".MuiAlert-message": { overflow: "hidden" },
                    }}
                  >
                    {errors.phoneNumber.message}
                  </Alert>
                )}
              </Box>
            </Box>
          </Box>
          <Divider sx={{ my: 3 }} />

          <Box sx={{ textAlign: "end" }}>
            <Button
              variant="contained"
              sx={{ bgcolor: (theme) => theme.commonColors, color: "white" }}
              type="submit"
            >
              Tiếp theo
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Step_1;
