import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategory } from "../../../api";

const Tags = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const findByCategory = (name) => {
    navigate(`/find_by_tags?tags=${name}`);
  };
  const fetchCategories = async () => {
    const response = await getAllCategory();
    setCategories(response);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Box sx={{ bgcolor: "#f5f5f5", p: 3 }}>
      <Container>
        <Box sx={{ bgcolor: "white" }}>
          <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
            <Typography>DANH MỤC</Typography>
            <Typography
              sx={{
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                  color: (theme) => theme.commonColors,
                },
              }}
              onClick={() => {
                navigate("/all_tag");
              }}
            >
              TẤT CẢ
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            {categories?.map(({ _id, name, image }, index) => {
              if (index < 20) {
                return (
                  <Box
                    key={_id}
                    sx={{
                      width: "117.6px",
                      height: "135px",
                      border: "1px solid rgba(0, 0, 0, .05)",
                      textAlign: "center",
                      color: "black",
                      "&:hover": {
                        borderColor: "rgba(0, 0, 0, .12)",
                        boxShadow: "0 0 .8125rem 0 rgba(0, 0, 0, .05)",
                      },
                      overflow: "hidden",
                      p: 1,
                      cursor: "pointer",
                    }}
                    onClick={() => findByCategory(name)}
                  >
                    <img src={image} style={{ width: "65%" }} />
                    <Typography>{name}</Typography>
                  </Box>
                );
              }
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Tags;
