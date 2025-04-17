import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const LanguageChange = () => {
  const [language, setLanguage] = useState("VietNam");
  const handleChange = (event) => {
    setLanguage(event.target.value);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" variant="standard">
      {/* <InputLabel
        id="demo-select-small-label"
        sx={{
          "&.Mui-focused": {
            color: (theme) =>
              theme.palette.mode === "dark" ? "primary.main" : "white",
          },
        }}
      >
        {language}
      </InputLabel> */}

      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={language}
        label="language"
        onChange={handleChange}
        sx={{
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "primary.main" : "white",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "primary.main" : "white",
          },
          color: (theme) =>
            theme.palette.mode === "dark" ? "primary.main" : "white",
        }}
      >
        <MenuItem value={"English"}>English</MenuItem>
        <MenuItem value={"VietNam"}>Tiếng Việt</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageChange;
