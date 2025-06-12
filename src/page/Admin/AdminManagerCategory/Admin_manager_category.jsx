import {
  Container,
  TextField,
  InputAdornment,
  Box,
  Typography,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Modal_add_category from "./Modal_add_category";

const Admin_manager_category = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleOpenModal = () => setOpen(!open);

  return (
    <Container
      sx={{
        my: 3,
        bgcolor: (theme) => theme.whiteColor,
        p: { xs: 1, sm: 3 },
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Tìm kiếm danh mục..."
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "black",
            },
            "& fieldset": {
              borderColor: "black",
            },
            "&:focus-within fieldset": {
              borderColor: "black !important",
            },
            "&:focus-visible fieldset": {
              borderColor: "black !important",
            },
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>
          danh sách các danh mục hiện có ({categories.length})
        </Typography>
        <Button
          variant="contained"
          sx={{ bgcolor: (theme) => theme.commonColors }}
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
        >
          Thêm danh mục
        </Button>
      </Box>
      <Modal_add_category open={open} handleOpenModal={handleOpenModal} />
    </Container>
  );
};

export default Admin_manager_category;
