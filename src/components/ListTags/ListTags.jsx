import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { getAllCategory } from "../../api";
import { Button } from "@mui/material";

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

export const ListTags = forwardRef(({ handleSelectTags, tagsIdData }, ref) => {
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const tagRef = useRef(null);
  useImperativeHandle(ref, () => ({
    clear: () => {
      setTags([]);
    },
    log: () => {
      console.log("hehee");
    },
  }));
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTags(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    handleSelectTags(value);
  };
  const handleGetCategories = async () => {
    const response = await getAllCategory();
    setCategories(response);
  };
  useEffect(() => {
    if (tagsIdData) {
      setTags(tagsIdData);
    }
    handleGetCategories();
  }, []);
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel
          id="demo-multiple-chip-label"
          sx={{
            "&.Mui-focused": {
              color: "black",
            },
          }}
        >
          Chọn nhãn sản phẩm
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={tags}
          onChange={handleChange}
          sx={{
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
            },
          }}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="Chọn nhãn sản phẩm"
            />
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
          {categories.map(({ _id, name }) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        sx={{
          bgcolor: (theme) => theme.commonColors,
          color: "white",
        }}
        onClick={() => {
          setTags([]);
          handleSelectTags("All");
        }}
      >
        clear
      </Button>
    </div>
  );
});
