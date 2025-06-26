import { useEffect, useState } from "react";
import { deleteAccount } from "../../../api";
import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { ModalAddBrands } from "./AddNewBrands";
import {
  deleteBrand,
  findBrandByAlphabet,
  getAllBrand,
} from "../../../api/brandAPI/brandAPI";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Alphabet } from "../../../utils/constants";
import { useConfirm } from "material-ui-confirm";
import { ModalDetailBrand } from "./ModalDetailBrand";
const Admin_manager_brands = () => {
  const [brands, setBrands] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [infoBrand, setInfoBrand] = useState({});
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
  const handleDeleteBrands = async (id) => {
    if (id) {
      const { confirmed } = await confirm({
        title: "Xác nhận loại bỏ thương hiệu này",
      });
      if (confirmed) {
        deleteBrand(id).then((res) => {
          if (!res?.error) {
            handleGetAllBrand(res);
          }
        });
      }
    }
  };
  useEffect(() => {
    handleGetAllBrand();
  }, []);
  return (
    <Box sx={{ my: 3, bgcolor: (theme) => theme.whiteColor, p: 3, mx: 5 }}>
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
      {brands?.length === 0 && (
        <Typography my={3}>Chưa đăng kí thương hiệu nào</Typography>
      )}
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
        <Button
          variant="contained"
          sx={{
            bgcolor: (theme) => theme.commonColors,
            color: "white",
            my: 2,
          }}
          onClick={() => setOpen(!open)}
        >
          Thêm mới
        </Button>
      </Box>
      <Grid container spacing={3} mt={3}>
        {brands?.map(({ _id, brandName, brandImage, shopOwnerBrand, tags }) => (
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
              src={brandImage}
              alt={brandName}
              style={{ width: "50px", height: "50px", cursor: "pointer" }}
              onClick={() => {
                setInfoBrand({
                  _id,
                  brandName,
                  brandImage,
                  shopOwnerBrand,
                  tags,
                });
                setOpenDetail(!openDetail);
              }}
            />
            <Typography>{brandName}</Typography>
            <Tooltip title="Xóa thương hiệu này" placement="top">
              <HighlightOffIcon
                sx={{ cursor: "pointer" }}
                onClick={() => handleDeleteBrands(_id)}
              />
            </Tooltip>
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
      <ModalAddBrands
        open={open}
        setOpen={setOpen}
        handleGetAllBrand={handleGetAllBrand}
      />
      {/* <ModalUpdateAccount
        open={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        handleGetAllAccount={handleGetAllAccount}
        infoAccountToUpdate={infoAccountToUpdate}
      /> */}

      <ModalDetailBrand
        open={openDetail}
        setOpen={setOpenDetail}
        infoBrand={infoBrand}
        handleGetAllBrand={handleGetAllBrand}
      />
    </Box>
  );
};

export default Admin_manager_brands;
