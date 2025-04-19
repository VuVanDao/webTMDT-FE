import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { flashSaleData } from "../../../Data/flashSaleData";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/formatter";

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none", background: "red" }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none", background: "green" }}
      onClick={onClick}
    />
  );
};
const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        // console.log(prev);
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <>
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <img
          src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/flashsale/fb1088de81e42c4e5389.png"
          style={{ width: "100px" }}
        />
        <Typography>{formattedTime}</Typography>
      </Box>
      <Box className="slider-container">
        <Slider {...settings}>
          {flashSaleData.map((item) => {
            return (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
                component={Link}
                to={"/homePage"}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center ",
                    color: "black",
                    gap: "10px",
                  }}
                >
                  <img
                    src={item.image}
                    style={{
                      cursor: "pointer",
                      width: "100px",
                      height: "100px",
                    }}
                  />

                  <Typography>{formatPrice(item.price)}</Typography>
                </div>
              </Box>
            );
          })}
        </Slider>
      </Box>
    </>
  );
};

export default FlashSale;
