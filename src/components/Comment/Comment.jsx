import { Avatar, Box, Rating, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../../redux/slice/userInfoSlice";
import { update, updateOrder } from "../../api";

const Comment = ({ productId, orderId, handleClose }) => {
  const [value, setValue] = useState(1);
  const userInfo = useSelector(userInfoSelector);
  const handleRating = (newValue) => {
    setValue(newValue);
  };
  const handleAddCardComment = async (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!event.target?.value) return;
      const commentToAdd = {
        userAvatar: userInfo?.avatar,
        username: userInfo?.username,
        userEmail: userInfo?.email,
        userId: userInfo?._id,
        commentContent: event.target.value.trim(),
        rating: value,
      };

      await update({ commentToAdd, id: productId }).then((res) => {
        event.target.value = "";
      });
      await updateOrder({ commentToAdd }, orderId).then((res) => {});

      handleClose();
    }
  };
  return (
    <Box sx={{ mt: 2 }}>
      <Box>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            handleRating(newValue);
          }}
        />
      </Box>
      {/* Xử lý thêm comment vào Card */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Avatar
          sx={{ width: 36, height: 36, cursor: "pointer" }}
          alt="trungquandev"
          src={userInfo?.avatar}
        />
        <TextField
          fullWidth
          placeholder="Viết đánh giá..."
          type="text"
          variant="outlined"
          multiline
          onKeyDown={handleAddCardComment}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "black",
              "& fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "black",
                color: "black",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Comment;
