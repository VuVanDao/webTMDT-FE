import {
  Container,
  CircularProgress,
  Box,
  Typography,
  Grid,
  Chip,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getDetailShop } from "../../../api";
import { useSearchParams } from "react-router-dom";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MDEditor from "@uiw/react-md-editor";
import { SHOP_STATUS } from "../../../utils/constants";
import List_product_tab from "./ShopTab/List_product_tab";
import List_orders_tab from "./ShopTab/List_orders_tab";
import List_rating_tab from "./ShopTab/list_rating_tab";

const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(Number(timestamp));
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Admin_Detail_Shop = () => {
  const [shopInfo, setShopInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const [value, setValue] = React.useState("1");

  let [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchShopInfo = async () => {
    setLoading(true);
    try {
      const res = await getDetailShop(id);
      setShopInfo(res[0]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchShopInfo();
  }, []);

  if (loading) {
    return (
      <Container sx={{ my: 3, bgcolor: (theme) => theme.whiteColor, p: 3 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!shopInfo)
    return (
      <Box>
        <Typography>Lỗi hiển thị</Typography>
      </Box>
    );

  return (
    <Box>
      <Box
        sx={{
          m: 3,
          bgcolor: (theme) => theme.whiteColor,
          p: { xs: 1, sm: 3 },
          mx: 6,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            alignItems: "center",
            pl: { xs: 0, md: 10 },
          }}
        >
          {/* Shop Logo */}
          <Avatar
            src={shopInfo.logo}
            alt={shopInfo.name}
            sx={{ width: 120, height: 120, mb: { xs: 2, md: 0 }, boxShadow: 2 }}
          />
          {/* Shop Details */}
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}
            >
              <Typography variant="h5" fontWeight={700} gutterBottom>
                {shopInfo.name}
              </Typography>
            </Box>

            <Grid container spacing={5}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body2" color="text.secondary">
                  Địa chỉ:
                </Typography>
                <Typography variant="body1">{shopInfo.address}</Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body2" color="text.secondary">
                  Số điện thoại:
                </Typography>
                <Typography variant="body1">{shopInfo.phoneNumber}</Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body2" color="text.secondary">
                  Email:
                </Typography>
                <Typography variant="body1">{shopInfo.email}</Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body2" color="text.secondary">
                  Ngày tạo:
                </Typography>
                <Typography variant="body1">
                  {formatDate(shopInfo.createdAt)}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body2" color="text.secondary">
                  Loại giao hàng:
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {shopInfo.delivery_type?.map((type) => (
                    <Chip
                      key={type}
                      label={type}
                      color="primary"
                      size="small"
                    />
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body2" color="text.secondary">
                  Số sản phẩm:
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {shopInfo?.products?.length}
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Button
            variant="container"
            sx={{
              bgcolor: (theme) => theme.commonColors,
              color: "white",
            }}
          >
            Khoá shop
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Danh sách sản phẩm" value="1" />
              <Tab label="Giao dịch gần đây" value="2" />
              <Tab label="Đánh giá gần đây" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {(shopInfo?.status === SHOP_STATUS.DENIED ||
              shopInfo?.status === SHOP_STATUS.PENDING) && (
              <Box>Hiện tại của hàng chưa được duyệt hoặc đã bị khoá</Box>
            )}
            {shopInfo?.status === SHOP_STATUS.ACCEPT && (
              <List_product_tab shopInfoProducts={shopInfo.products} />
            )}
          </TabPanel>
          <TabPanel value="2">
            <List_orders_tab shopId={id} />
          </TabPanel>
          <TabPanel value="3">
            <List_rating_tab products={shopInfo?.products} />
          </TabPanel>
        </TabContext>
      </Box>

      {/* description */}
      {shopInfo?.status === SHOP_STATUS.ACCEPT && (
        <Container sx={{ my: 3, bgcolor: (theme) => theme.whiteColor, p: 3 }}>
          <MDEditor.Markdown
            source={shopInfo?.description}
            style={{
              whiteSpace: "pre-wrap",
            }}
          />
        </Container>
      )}
    </Box>
  );
};

export default Admin_Detail_Shop;
