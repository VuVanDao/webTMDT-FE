import { Button } from "@mui/material";
import React from "react";

const CommonButton = ({ value }) => {
  return (
    <Button sx={{ bgcolor: (theme) => theme.commonColors }} variant="contained">
      {value}
    </Button>
  );
};

export default CommonButton;
