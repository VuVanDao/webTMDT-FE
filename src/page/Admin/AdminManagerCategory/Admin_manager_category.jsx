import {
  Container,
  TextField,
  InputAdornment,
  Box,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Modal_add_category from "./Modal_add_category";
import { getAllCategory } from "../../../api";

const Admin_manager_category = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleOpenModal = () => setOpen(!open);
  const getCategories = async () => {
    const res = await getAllCategory();
    if (!res.error) {
      setCategories(res);
    }
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
      <Grid container spacing={2} mt={3}>
        {categories?.map(({ _id, name, image }) => (
          <Grid
            key={_id}
            size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid black",
              p: "5px 10px",
              borderRadius: "10px",
            }}
          >
            <img
              src={image}
              alt={name}
              style={{ width: "50px", height: "50px", marginRight: "10px" }}
            />
            <Typography>{name}</Typography>
          </Grid>
        ))}
      </Grid>
      <Modal_add_category open={open} handleOpenModal={handleOpenModal} />
    </Container>
  );
};

export default Admin_manager_category;
