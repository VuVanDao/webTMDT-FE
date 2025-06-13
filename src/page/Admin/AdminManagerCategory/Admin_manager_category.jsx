import {
  Container,
  TextField,
  InputAdornment,
  Box,
  Typography,
  Button,
  Grid,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Modal_add_category from "./Modal_add_category";
import { deleteCategory, getAllCategory, searchCategory } from "../../../api";
import { createSearchParams } from "react-router-dom";
import { useDebounceFn } from "../../../customHook/useDebounceFn";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
const Admin_manager_category = () => {
  const [categories, setCategories] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  // const [resultSearch, setResultSearch] = useState([]);

  const handleSearchChange = (event) => {
    if (!event.target.value) {
      return;
    }
    // setSearchQuery(event.target.value);
    const searchPath = `?${createSearchParams({
      "q[name]": event.target.value,
    })}`;
    searchCategory(searchPath).then((res) => {
      setCategories(res || []);
    });
  };
  const debounceSearchProduct = useDebounceFn(handleSearchChange);
  const handleOpenModal = () => setOpen(!open);
  const getCategories = async () => {
    const res = await getAllCategory();
    if (!res.error) {
      setCategories(res);
    }
  };
  const handleDeleteCategory = async (id) => {
    await deleteCategory(id).then((res) => {
      if (!res.error) {
        getCategories();
      }
    });
  };
  useEffect(() => {
    getCategories();
  }, []);
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
        placeholder="Tìm kiếm danh mục hiện có..."
        // value={searchQuery}
        onChange={debounceSearchProduct}
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
      <Grid container spacing={3} mt={3}>
        {categories?.map(({ _id, name, image }) => (
          <Grid
            key={_id}
            size={{ xs: 6, sm: 4, md: 2 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid black",
              p: "5px",
              borderRadius: "10px",
            }}
          >
            <img
              src={image}
              alt={name}
              style={{ width: "50px", height: "50px" }}
            />
            <Typography>{name}</Typography>
            <Tooltip title="Xóa danh mục" placement="top">
              <HighlightOffIcon
                sx={{ cursor: "pointer" }}
                onClick={() => handleDeleteCategory(_id)}
              />
            </Tooltip>
          </Grid>
        ))}
      </Grid>
      <Modal_add_category
        open={open}
        handleOpenModal={handleOpenModal}
        getCategories={getCategories}
      />
    </Container>
  );
};

export default Admin_manager_category;
