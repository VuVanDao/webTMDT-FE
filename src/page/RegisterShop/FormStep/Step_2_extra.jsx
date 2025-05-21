import { Box, Button, Divider, TextField } from "@mui/material";
import StepperExample from "../../../components/Stepper/StepperExample";
import { useState } from "react";
import { updateDataFormRegisterShopStep2extra } from "../../../redux/slice/dataFromRegisterShopSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Step_2_extra = () => {
  const [description, setDescription] = useState("");
  const fieldsetCommonStyle100 = {
    "& label": {
      color: "#ccc",
    },
    "& input": {
      color: "black !important",
    },
    "& label.Mui-focused": {
      color: "black !important",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#ccc",
        color: "black !important",
      },
      "&:hover fieldset": {
        borderColor: "black",
        color: "black !important",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
        color: "black !important",
      },
    },
  };
  const boxStyle = {
    my: 2,
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSetDescription = (e) => {
    setDescription(e?.target?.value);
  };
  const handleConfirmDes = () => {
    if (!description) {
      toast.error("không được để trống phần miêu tả");
    }
    dispatch(updateDataFormRegisterShopStep2extra(description));
    navigate("/register_shop/step_3");
  };
  return (
    <Box>
      <StepperExample activeStep={2} />
      <Divider sx={{ my: 3 }} />
      <Box sx={boxStyle}>
        <TextField
          // defaultValue="test"
          fullWidth
          multiline
          label="Miêu tả cửa hàng"
          rows={5}
          sx={fieldsetCommonStyle100}
          onChange={handleSetDescription}
        />
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
          onClick={handleConfirmDes}
        >
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default Step_2_extra;
