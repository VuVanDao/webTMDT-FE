import { styled } from "@mui/material/styles";

const HiddenInputStyles = styled("input")({
  display: "none",
});

const CustomInputFile = (props) => {
  return <HiddenInputStyles {...props} />;
};

export default CustomInputFile;
