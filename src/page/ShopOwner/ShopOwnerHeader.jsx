import { Box, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AppsIcon from "@mui/icons-material/Apps";
import MyAccount from "../../components/MyAccount/MyAccount";
const ShopOwnerHeader = ({ toggleDrawer, myShopHeader }) => {
  if (myShopHeader) {
    return (
      <Box
        sx={{
          bgcolor: "white",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: "0 30px",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          <AppsIcon
            sx={{
              color: (theme) => theme.commonColors,
              mt: "8px",
              fontSize: "30px",
              cursor: "pointer",
            }}
            onClick={toggleDrawer()}
          />

          <Box
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
            component={Link}
            to={"/homePage"}
          >
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg"
              }
              style={{ width: "120px", cursor: "pointer" }}
            />
            <Divider
              orientation="vertical"
              variant="middle"
              sx={{ bgcolor: "red", height: "35px" }}
            />
            <Typography
              sx={{
                color: (theme) => theme.commonColors,
                fontSize: "20px",
                mt: "10px",
              }}
            >
              Kênh người bán
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <NotificationsIcon sx={{ color: (theme) => theme.commonColors }} />
          <MyAccount color={true} />
        </Box>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          bgcolor: "white",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: "0 30px",
          position: "sticky",
          top: 0,
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
            component={Link}
            to={"/homePage"}
          >
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg"
              }
              style={{ width: "120px", cursor: "pointer" }}
            />
            <Divider
              orientation="vertical"
              variant="middle"
              sx={{ bgcolor: "red", height: "35px" }}
            />
            <Typography
              sx={{
                color: (theme) => theme.commonColors,
                fontSize: "20px",
                mt: "10px",
              }}
            >
              Đăng ký trở thành Người bán Shopee
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <MyAccount color={true} />
        </Box>
      </Box>
    );
  }
};

export default ShopOwnerHeader;
