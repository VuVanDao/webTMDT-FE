import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage/HomePage";
import Detail from "./page/Detail/Detail";
import CheckoutPage from "./page/checkout/checkout";
import SearchData from "./page/Body/SearchData/searchData";
import LoginForm from "./page/Login/LoginSigninForm";
import AccountVerification from "./page/Auth/AccountVerification";
import CartDetail from "./components/Cart/CartDetail";
import DetailAccount from "./page/Account/DetailAccount";
import RouteCheckRole from "./RouteCheckRole/RouteCheckRole";
import { permission } from "./roleConfig/roleConfig";
import DeniedPage from "./components/DeniedPage/DeniedPage";

const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
};
const UnauthorizedRoute = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  if (user) {
    return <Navigate to={"/homePage"} />;
  }
  return <Outlet />;
};
const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={"/homePage"} replace={true} />}
        />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/search" element={<SearchData />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/cartDetail" element={<CartDetail />} />
          <Route path="/MyAccount" element={<DetailAccount />} />

          {/* admin */}
          {/*admin_manage_shop  */}
          <Route
            element={
              <RouteCheckRole
                requiredPermission={permission.admin_manage_shop}
              />
            }
          >
            {" "}
            <Route path="/admin_manage_shop" element={<DetailAccount />} />
          </Route>

          {/* admin_dashboard */}
          <Route
            element={
              <RouteCheckRole requiredPermission={permission.admin_dashboard} />
            }
          >
            {" "}
            <Route path="/admin_dashboard" element={<DetailAccount />} />
          </Route>

          {/* admin_manage_user */}
          <Route
            element={
              <RouteCheckRole
                requiredPermission={permission.admin_manage_user}
              />
            }
          >
            {" "}
            <Route path="/admin_manage_user" element={<DetailAccount />} />
          </Route>

          {/* shop_detail */}
          <Route
            element={
              <RouteCheckRole requiredPermission={permission.shop_detail} />
            }
          >
            {" "}
            <Route path="/shop_detail" element={<DetailAccount />} />
          </Route>
        </Route>

        <Route element={<UnauthorizedRoute />}>
          <Route path="/login" element={<LoginForm formState={"login"} />} />
          <Route path="/signin" element={<LoginForm formState={"signin"} />} />
        </Route>
        <Route path="/account/verification" element={<AccountVerification />} />
        <Route path="/access-denied" element={<DeniedPage />} />
        <Route
          path="*"
          element={<Navigate to={"/access-denied"} replace={true} />}
        />
      </Routes>
    </>
  );
};

export default App;
