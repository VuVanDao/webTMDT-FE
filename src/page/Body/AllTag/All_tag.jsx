import { useEffect, useState } from "react";
import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { Alphabet } from "../../../utils/constants";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getAllCategory } from "../../../api";
import { findTagByAlphabet } from "../../../api/tagAPI/tagAPI";
import { useNavigate } from "react-router-dom";

const All_tag = () => {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const handleGetAllTag = async () => {
    const res = await getAllCategory();
    if (!res.error) {
      setTags(res);
    }
  };

  const handleFindCategory = async (id) => {
    if (id) {
      findTagByAlphabet(id).then((res) => {
        if (!res?.error) {
          setTags(res);
        }
      });
    }
  };
  const handleFindByTags = (name) => {
    navigate(`/find_by_tags?tags=${name}`);
  };
  useEffect(() => {
    handleGetAllTag();
  }, []);
  return (
    <Box sx={{ bgcolor: (theme) => theme.bgColor }}>
      <Header showHeader={true} />
      <Box sx={{ my: 3, bgcolor: "white", p: 3, mx: 5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "sticky",
            top: "90px",
            zIndex: 3,
            bgcolor: "white",
            py: 3,
            borderBottom: "1px solid rgba(0, 0, 0, .09)",
          }}
        >
          {Alphabet?.map((item, index) => (
            <Box
              key={index}
              sx={{
                color: "rgba(0,0,0,.4)",
                "&:hover": {
                  color: "black",
                  bgcolor: "rgba(0,0,0,.4)",
                },
                cursor: "pointer",
                borderRadius: "5px",
                transition: "all 0.5s",
                px: 2,
                py: 1,
              }}
              onClick={() => handleFindCategory(item)}
            >
              {item}
            </Box>
          ))}
        </Box>

        <Typography>danh sách các danh mục hiện có ({tags.length})</Typography>

        <Grid container spacing={1} mt={3}>
          {tags?.map(({ _id, name, image }) => (
            <Grid
              key={_id}
              size={{ xs: 6, sm: 4, md: 2 }}
              sx={{
                border: "1px solid black",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                height: "100px",
                cursor: "pointer",
              }}
              onClick={() => handleFindByTags(name)}
            >
              <img
                src={image}
                alt={name}
                style={{ width: "50px", height: "50px" }}
              />
              <Typography>{name}</Typography>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => window.scrollTo(0, 0)}
        >
          <ArrowCircleUpIcon />
        </Button>
      </Box>
      <Footer />
    </Box>
  );
};

export default All_tag;
