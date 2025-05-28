import { useState } from "react";
import TextField from "@mui/material/TextField";

function ToggleFocusInput({
  value,
  onChangedValue,
  inputFontSize = "16px",
  ...props
}) {
  // console.log("🚀 ~ value:", value);
  const [inputValue, setInputValue] = useState(value);

  // Blur là khi chúng ta không còn Focus vào phần tử nữa thì sẽ trigger hành động ở đây.
  const triggerBlur = () => {
    // Support Trim cái dữ liệu State inputValue cho đẹp luôn sau khi blur ra ngoài
    setInputValue(inputValue.trim());

    // Nếu giá trị không có gì thay đổi hoặc Nếu user xóa hết nội dung thì set lại giá trị gốc ban đầu theo value từ props và return luôn không làm gì thêm
    if (!inputValue || inputValue.trim() === value) {
      setInputValue(value);
      return;
    }

    // console.log("value: ", value);
    // console.log("inputValue: ", inputValue);
    // Khi giá trị có thay đổi ok thì gọi lên func ở Props cha để xử lý
    onChangedValue(inputValue);
  };

  return (
    <TextField
      id="toggle-focus-input-controlled"
      fullWidth
      variant="outlined"
      // size="small"
      value={inputValue}
      onChange={(event) => {
        setInputValue(event.target.value);
      }}
      onBlur={triggerBlur}
      {...props}
      // Magic here :D
      sx={{
        "& input": { fontSize: inputFontSize, fontWeight: "bold" },
        "& .MuiOutlinedInput-root": {
          backgroundColor: "transparent",
          color: "black",
          "& fieldset": { borderColor: "transparent" },
        },
        "& .MuiOutlinedInput-root:hover": {
          borderColor: "transparent",
          "& fieldset": { borderColor: "transparent" },
        },
        "& .MuiOutlinedInput-root.Mui-focused": {
          backgroundColor: "white",
          color: "black",
          "& fieldset": {
            borderColor: "black",
          },
        },
        // height: "200px",
        overflow: "auto",
        // "& .MuiOutlinedInput-input": {
        //   px: "6px",
        //   overflow: "hidden",
        //   // whiteSpace: "nowrap",
        //   // textOverflow: "ellipsis",
        // },
      }}
    />
  );
}

export default ToggleFocusInput;
