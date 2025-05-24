import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useEffect, useState } from "react";

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

const sizes = [
  "S (<50kg)",
  "M (<60kg)",
  "l (<70kg)",
  "XL (<90kg)",
  "2XL (<120kg)",
];

export const SizesList = ({ handleSelectSize, open, sizeData }) => {
  const [size, setSize] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSize(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    handleSelectSize(value);
  };
  useEffect(() => {
    if (sizeData) {
      setSize(sizeData);
    }
  }, []);
  if (!open) {
    return "";
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel
          id="demo-multiple-chip-label"
          sx={{
            "&.Mui-focused": {
              color: "black",
            },
          }}
        >
          Chọn kích cỡ
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={size}
          onChange={handleChange}
          sx={{
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
            },
          }}
          input={
            <OutlinedInput id="select-multiple-chip" label="Chọn kích cỡ " />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {sizes.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
