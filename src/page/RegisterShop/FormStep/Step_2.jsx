import { Alert, Box, Button, Container, Divider } from "@mui/material";
import StepperExample from "../../../components/Stepper/StepperExample";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DataFormRegisterShopSelector,
  updateDataFormRegisterShopStep2,
} from "../../../redux/slice/dataFromRegisterShopSlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  { key: "FAST", value: "Vận chuyển nhanh" },
  { key: "SUPER_FAST", value: "Hoả tốc" },
];

const Step_2 = () => {
  const [Delivery, setDelivery] = useState([]);
  const [checkError, setCheckError] = useState(false);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDelivery(typeof value === "string" ? value.split(",") : value);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataFormRegisterShop = useSelector(DataFormRegisterShopSelector);
  const validateBefore = (data) => {
    const condition = ["name", "address", "email", "phoneNumber"];
    condition.map((item) => {
      if (!data[item]) {
        return false;
      }
    });
    return true;
  };
  useEffect(() => {
    if (!validateBefore(dataFormRegisterShop)) {
      navigate("/register_shop/step_1");
    }
    if (dataFormRegisterShop?.delivery_type?.length > 0) {
      setDelivery(dataFormRegisterShop?.delivery_type);
    }
  }, []);
  const handleSelectDelivery = () => {
    const checkData = [...Delivery];
    if (checkData?.length === 0) {
      setCheckError(true);
      return;
    }
    dispatch(updateDataFormRegisterShopStep2(Delivery));
    navigate("/register_shop/step_2_extra");
  };
  return (
    <Box>
      <StepperExample activeStep={1} />
      <Divider sx={{ my: 3 }} />
      <FormControl
        sx={{ m: 1, width: 300, color: "black", borderColor: "black" }}
      >
        <InputLabel
          id="demo-multiple-name-label"
          sx={{
            "&.Mui-focused": {
              color: "black",
            },
            color: "black",
          }}
        >
          Phương thức vận chuyển
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={Delivery}
          onChange={handleChange}
          input={<OutlinedInput label="Phương thức vận chuyển" />}
          MenuProps={MenuProps}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(196 196 196)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
              color: "black",
            },
            ".MuiSvgIcon-root": {
              color: "black",
            },
            color: "black",
          }}
        >
          {names.map((item, index) => (
            <MenuItem key={index} value={item.key}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
        {checkError && (
          <Alert
            severity="error"
            sx={{
              mt: "0.7em",
              ".MuiAlert-message": { overflow: "hidden" },
            }}
          >
            Chọn 1 phương thức vận chuyển
          </Alert>
        )}
      </FormControl>

      <Divider sx={{ my: 3 }} />
      <Box sx={{ textAlign: "end" }}>
        <Button
          variant="contained"
          sx={{ bgcolor: (theme) => theme.commonColors, color: "white" }}
          onClick={handleSelectDelivery}
        >
          Tiếp theo
        </Button>
      </Box>
    </Box>
  );
};

export default Step_2;
