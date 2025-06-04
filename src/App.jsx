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
import Dashboard from "./page/Admin/Dashboard";
import ShopDetail from "./page/ShopOwner/ShopDetail";
import MyShop from "./page/ShopOwner/MyShop";
import GetAllProduct from "./page/ShopOwner/CRUDProduct/GetAllProduct";
import AddNewProduct from "./page/ShopOwner/CRUDProduct/AddNewProduct";
import UpdateProduct from "./page/ShopOwner/CRUDProduct/UpdateProduct";
import DeleteProduct from "./page/ShopOwner/CRUDProduct/DeleteProduct";
import Welcome from "./page/RegisterShop/welcome";
import RegisterPage from "./page/RegisterShop/RegisterPage";
import Step_1 from "./page/RegisterShop/FormStep/Step_1";
import Step_2 from "./page/RegisterShop/FormStep/Step_2";
import Step_3 from "./page/RegisterShop/FormStep/Step_3";
import FinalStep from "./page/RegisterShop/FormStep/FinalStep";
import ShopAdminManager from "./page/Admin/ShopAdminManager";
import AdminPage from "./page/Admin/AdminPage";
import Step_2_extra from "./page/RegisterShop/FormStep/Step_2_extra";
import { useSelector } from "react-redux";
import { userInfoSelector } from "./redux/slice/userInfoSlice";
import Information from "./page/Account/Information";
import PurchaseDetail from "./page/Account/purchaseDetail";
import AllOrder from "./page/Account/purchaseTab/AllOrder";
import PendingOrder from "./page/Account/purchaseTab/PendingOrder";
import DoneOrder from "./page/Account/purchaseTab/DoneOrder";
import RejectOrder from "./page/Account/purchaseTab/RejectOrder";
import DeliveringOrder from "./page/Account/purchaseTab/DeliveringOrder";
import Manage_account from "./page/Admin/AdminAccount/manage_account";
import ListOrders from "./page/ShopOwner/Order/ListShopOrders";
import AllShopOrder from "./page/ShopOwner/Order/AllShopOrder";
import PendingShopOrder from "./page/ShopOwner/Order/PendingShopOrder";
import DeliveringShopOrder from "./page/ShopOwner/Order/DeliveringShopOrder";
import DoneShopOrder from "./page/ShopOwner/Order/DoneShopOrder";
import RejectShopOrder from "./page/ShopOwner/Order/RejectShopOrder";
import AcceptedOrder from "./page/Account/purchaseTab/AcceptedOrder";

const ProtectedRoute = () => {
  const user = useSelector(userInfoSelector);
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
};
const ProtectRegisterRouter = () => {
  const user = useSelector(userInfoSelector);
  if (user?.role === "shop_owner") {
    return <Navigate to={"/homePage"} />;
  }
  return <Outlet />;
};
const UnauthorizedRoute = () => {
  const user = useSelector(userInfoSelector);
  if (user) {
    return <Navigate to={"/homePage"} />;
  }
  return <Outlet />;
};
// console.log(process.env.BUILD_MODE);
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

        {/* user */}
        <Route path="/user" element={<DetailAccount />}>
          <Route
            path=""
            element={<Navigate to={"MyAccount"} replace={true} />}
          />
          <Route path="MyAccount" element={<Information />} />

          <Route path="purchase" element={<PurchaseDetail />}>
            <Route
              path=""
              element={<Navigate to={"all_order"} replace={true} />}
            />
            <Route path="all_order" element={<AllOrder />} />
            <Route path="pending_order" element={<PendingOrder />} />
            <Route path="accepted_order" element={<AcceptedOrder />} />
            <Route path="delivering_order" element={<DeliveringOrder />} />
            <Route path="done_order" element={<DoneOrder />} />
            <Route path="reject_order" element={<RejectOrder />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/cartDetail" element={<CartDetail />} />
          {/* <Route path="/MyAccount" element={<DetailAccount />} /> */}
          <Route element={<ProtectRegisterRouter />}>
            {/* register shop */}
            <Route path="/register_shop" element={<Welcome />} />

            <Route path="/register_shop" element={<RegisterPage />}>
              <Route
                path=""
                element={<Navigate to={"welcome"} replace={true} />}
              />
              <Route path="welcome" element={<Welcome />} />
              <Route path="step_1" element={<Step_1 />} />
              <Route path="step_2" element={<Step_2 />} />
              <Route path="step_2_extra" element={<Step_2_extra />} />
              <Route path="step_3" element={<Step_3 />} />
              <Route path="final_step" element={<FinalStep />} />
              {/* <Route path="addNewProduct" element={<AddNewProduct />} /> */}
              {/* <Route path="updateProduct" element={<UpdateProduct />} /> */}
              {/* <Route path="deleteProduct" element={<DeleteProduct />} /> */}
            </Route>
          </Route>

          {/* admin */}
          {/*admin_manage_shop  */}
          <Route
            element={<RouteCheckRole requiredPermission={permission.admin} />}
          >
            <Route path="/admin" element={<AdminPage />}>
              <Route
                path=""
                element={<Navigate to={"admin_manage_shop"} replace={true} />}
              />
              <Route path="admin_manage_shop" element={<ShopAdminManager />} />
              <Route path="admin_manage_account" element={<Manage_account />} />
            </Route>
          </Route>

          {/* admin_dashboard */}
          {/* <Route
            element={
              <RouteCheckRole requiredPermission={permission.admin_dashboard} />
            }
          >
            <Route path="/admin_dashboard" element={<Dashboard />} />
          </Route> */}

          {/* admin_manage_user */}
          {/* <Route
            element={
              <RouteCheckRole
                requiredPermission={permission.admin_manage_user}
              />
            }
          >
            <Route path="/admin_manage_user" element={<DetailAccount />} />
          </Route> */}

          {/* shop_detail */}
          <Route
            element={
              <RouteCheckRole requiredPermission={permission.shop_detail} />
            }
          >
            <Route path="/shop_detail" element={<ShopDetail />}>
              <Route
                path=""
                element={<Navigate to={"myShop"} replace={true} />}
              />
              <Route path="myShop" element={<MyShop />} />
              <Route path="getAllProduct" element={<GetAllProduct />} />
              <Route path="addNewProduct" element={<AddNewProduct />} />
              <Route path="updateProduct" element={<UpdateProduct />} />
              <Route path="deleteProduct" element={<DeleteProduct />} />

              <Route path="orders" element={<ListOrders />}>
                <Route
                  path=""
                  element={<Navigate to={"all_order"} replace={true} />}
                />
                <Route path="all_order" element={<AllShopOrder />} />
                <Route path="pending_order" element={<PendingShopOrder />} />
                <Route
                  path="delivering_order"
                  element={<DeliveringShopOrder />}
                />
                <Route path="done_order" element={<DoneShopOrder />} />
                <Route path="reject_order" element={<RejectShopOrder />} />
              </Route>
            </Route>
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
