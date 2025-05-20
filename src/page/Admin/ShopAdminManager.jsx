import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllShop, getDetailShop } from "../../api";
import { useNavigate } from "react-router-dom";

const ShopAdminManger = () => {
  const [listShop, setListShop] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const handleGetAllShop = async () => {
      const res = await getAllShop();
      console.log("🚀 ~ handleGetAllShop ~ res:", res);
      setListShop(res);
    };
    handleGetAllShop();
  }, []);
  const handleGetDetailShop = async (id) => {
    const res = await getDetailShop(id);
    console.log("🚀 ~ handleGetDetailShop ~ res:", res);
    if (res) {
      // navigate()
    }
  };
  return (
    <Box>
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
                    width: "70%",
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
                    <Typography>Chủ shop: {item?.name}</Typography>
                    <Typography>Địa chỉ: {item?.address}</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
export default ShopAdminManger;
