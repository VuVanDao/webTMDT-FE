import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllShop } from "../../api";
import { DetailModal } from "./DetailModal";
import { LoadingPage } from "../../components/LoadingPage/LoadingPage";

const ShopAdminManger = () => {
  const [listShop, setListShop] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [dataDetailShop, setDataDetailShop] = useState(null);
  const handleGetAllShop = async () => {
    const res = await getAllShop();
    // console.log("🚀 ~ handleGetAllShop ~ res:", res);
    if (!res.error) {
      setListShop(res);
    }
  };
  useEffect(() => {
    handleGetAllShop();
  }, []);
  const handleGetDetailShop = async (id) => {
    const listShopClone = [...listShop];
    const res = listShopClone.find((i) => i._id === id);
    if (res) {
      setDataDetailShop(res);
      setOpenModal(!openModal);
    }
  };
  if (!listShop) {
    return <LoadingPage />;
  }
  return (
    <Box
      sx={{
        color: "black",
        height: (theme) => theme.customHeight.AdminBody,
      }}
    >
      <Typography variant="h6">Danh sách các shop đăng kí</Typography>
      <Typography variant="body2">
        Tổng cộng {listShop?.length} shop đang chờ duyệt...
      </Typography>
      <Grid container spacing={5} mt={3}>
        {listShop.map((item) => {
          return (
            <Grid
              key={item._id}
              size={{ lg: 3, md: 3, sm: 4, xs: 6 }}
              sx={{
                border: "1px solid rgba(0, 0, 0, .05)",
                textAlign: "center",
                "&:hover": {
                  borderColor: "black",
                  boxShadow: "0 0 .8125rem 0 rgba(0, 0, 0, .05)",
                },
                p: 1,
                borderRadius: "10px",
              }}
              onClick={() => handleGetDetailShop(item._id)}
            >
              <Box>
                <img
                  src={item?.logo}
                  alt={item?.name}
                  style={{
                    width: "170px",
                    height: "170px",
                    border: "1px solid black",
                    borderRadius: "50%",
                  }}
                />
                <Box>
                  <Box
                    sx={{
                      height: "50px",
                      overflow: "hidden",
                      color: "black",
                    }}
                  >
                    <Typography>Tên shop: {item?.name}</Typography>
                    <Typography>Địa chỉ: {item?.address}</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <DetailModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        dataDetailShop={dataDetailShop}
        setDataDetailShop={setDataDetailShop}
        handleGetAllShop={handleGetAllShop}
      />
    </Box>
  );
};
export default ShopAdminManger;
