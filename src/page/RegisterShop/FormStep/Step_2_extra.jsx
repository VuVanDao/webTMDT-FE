import { Box, Button, Divider, TextField } from "@mui/material";
import StepperExample from "../../../components/Stepper/StepperExample";
import { useState } from "react";
import { updateDataFormRegisterShopStep2extra } from "../../../redux/slice/dataFromRegisterShopSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";

const Step_2_extra = () => {
  const [description, setDescription] = useState("");

  const boxStyle = {
    my: 2,
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        <MDEditor
          value={description}
          onChange={setDescription}
          height={"500px"}
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
