import { Avatar, Box, Rating, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../../redux/slice/userInfoSlice";
import { update, updateOrder } from "../../api";
import { toast } from "react-toastify";

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
      {/* Hiển thị danh sách các comments */}
      {/* {cardComments.length === 0 && (
        <Typography
          sx={{
            pl: "45px",
            fontSize: "14px",
            fontWeight: "500",
            color: "#b1b1b1",
          }}
        >
          No activity found!
        </Typography>
      )} */}
      {/* {cardComments.map((comment, index) => (
        <Box
          sx={{ display: "flex", gap: 1, width: "100%", mb: 1.5 }}
          key={index}
        >
          <Tooltip title="trungquandev">
            <Avatar
              sx={{ width: 36, height: 36, cursor: "pointer" }}
              alt="trungquandev"
              src={comment?.userAvatar}
            />
          </Tooltip>
          <Box sx={{ width: "inherit" }}>
            <Typography variant="span" sx={{ fontWeight: "bold", mr: 1 }}>
              {comment?.userDisplayName}
            </Typography>

            <Typography variant="span" sx={{ fontSize: "12px" }}>
              {moment(comment?.commentAt).format("llll")}
            </Typography>

            <Box
              sx={{
                display: "block",
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "#33485D" : "white",
                p: "8px 12px",
                mt: "4px",
                border: "0.5px solid rgba(0, 0, 0, 0.2)",
                borderRadius: "4px",
                wordBreak: "break-word",
                boxShadow: "0 0 1px rgba(0, 0, 0, 0.2)",
              }}
            >
              {comment?.content}
            </Box>
          </Box>
        </Box>
      ))} */}
    </Box>
  );
};

export default Comment;
