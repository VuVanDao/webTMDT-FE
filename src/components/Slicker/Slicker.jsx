import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import { SlickerData } from "../../Data/SlickerData";
import { Link } from "react-router-dom";

const Slicker = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {SlickerData.item.map((item, index) => {
        return (
          <Box key={index}>
            <Box component={Link} to="/">
              <img
                src={item.image}
                style={{ width: "100%", cursor: "pointer" }}
              />
            </Box>
          </Box>
        );
      })}
    </Slider>
  );
};

export default Slicker;
