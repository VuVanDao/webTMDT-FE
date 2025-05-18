import { Box, Divider } from "@mui/material";
import React from "react";
import StepperExample from "../../../components/Stepper/StepperExample";

const FinalStep = () => {
  return (
    <Box>
      <StepperExample activeStep={3} />
      <Divider sx={{ my: 3 }} />
      <div>FinalStep</div>
    </Box>
  );
};

export default FinalStep;
