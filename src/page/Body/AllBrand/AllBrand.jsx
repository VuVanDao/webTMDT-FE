import { useEffect, useState } from "react";
import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Alphabet } from "../../../utils/constants";
import { useConfirm } from "material-ui-confirm";
import {
  findBrandByAlphabet,
  getAllBrand,
} from "../../../api/brandAPI/brandAPI";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const All_brand = () => {
  const [brands, setBrands] = useState([]);
  const [open, setOpen] = useState(false);
  const confirm = useConfirm();
  const handleGetAllBrand = async () => {
    const res = await getAllBrand();
    if (!res.error) {
      setBrands(res);
    }
  };

  const handleFindBrand = async (id) => {
    if (id) {
      findBrandByAlphabet(id).then((res) => {
        if (!res?.error) {
          setBrands(res);
        }
      });
    }
  };

  useEffect(() => {
    handleGetAllBrand();
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
            top: "80px",
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
              onClick={() => handleFindBrand(item)}
            >
              {item}
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>
            danh sách các danh mục hiện có ({brands.length})
          </Typography>
        </Box>

        <Grid container spacing={1} mt={3}>
          {brands?.map(({ _id, brandName, brandImage, shopOwnerBrand }) => (
            <Grid
              key={_id}
              size={{ xs: 6, sm: 4, md: 2 }}
              sx={{
                border: "1px solid black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={brandImage}
                alt={brandName}
                style={{ width: "200px", height: "110px" }}
              />
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

export default All_brand;
