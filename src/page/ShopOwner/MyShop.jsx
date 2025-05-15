import React from "react";
import TodoList from "./TodoList";
import { Box, Container } from "@mui/material";
import AnalysisShop from "./analysisShop";

const MyShop = () => {
  return (
    <Container>
      <TodoList />
      <Box>
        <AnalysisShop />
      </Box>
    </Container>
  );
};

export default MyShop;
