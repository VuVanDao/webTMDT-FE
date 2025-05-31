import { Button } from "@mui/material";

const CommonButton = ({ content }) => {
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: (theme) => theme.commonColors,
        color: "white",
        my: 2,
      }}
    >
      {content}
    </Button>
  );
};

export default CommonButton;
