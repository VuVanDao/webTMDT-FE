import React from "react";
import { Stepper, Step, StepLabel, StepConnector } from "@mui/material";
import { styled } from "@mui/material/styles";
const ColorLibConnector = styled(StepConnector)(({ theme }) => ({
  alternativeLabel: {
    top: 22,
  },
  line: {
    height: 2,
    border: 0,
    backgroundColor: "#e0e0e0",
    borderRadius: 1,
  },
}));

const steps = ["Thông tin Shop", "Cài đặt vận chuyển", "Ảnh", "Hoàn tất"];

const StepperExample = ({ activeStep = 0 }) => {
  return (
    <Stepper
      alternativeLabel
      activeStep={activeStep}
      connector={<ColorLibConnector />}
    >
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel
            sx={{
              "& .MuiStepLabel-label": {
                color: activeStep === index ? "black" : "#bdbdbd",
                fontWeight: activeStep === index ? "600" : "400",
              },
              "& .Mui-active .MuiStepIcon-root": {
                color: activeStep === index ? "#f44336" : "#bdbdbd",
              },
              "& .Mui-completed .MuiStepIcon-root": {
                color: "#f44336",
              },
            }}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepperExample;
