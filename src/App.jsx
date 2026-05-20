import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import HomePage from "./page/HomePage/HomePage";
const Detail = lazy(() => import("./page/Detail/Detail"));
const CheckoutPage = lazy(() => import("./page/checkout/checkout"));
const SearchData = lazy(() => import("./page/Body/SearchData/searchData"));
const LoginForm = lazy(() => import("./page/Login/LoginSigninForm"));
const AccountVerification = lazy(() =>
  import("./page/Auth/AccountVerification")
);
const DetailAccount = lazy(() => import("./page/Account/DetailAccount"));
const RouteCheckRole = lazy(() => import("./RouteCheckRole/RouteCheckRole"));
const DeniedPage = lazy(() => import("./components/DeniedPage/DeniedPage"));
const Dashboard = lazy(() => import("./page/Admin/Dashboard"));
const ShopDetail = lazy(() => import("./page/ShopOwner/ShopDetail"));
const MyShop = lazy(() => import("./page/ShopOwner/MyShop"));
const GetAllProduct = lazy(() =>
  import("./page/ShopOwner/CRUDProduct/GetAllProduct")
);
const AddNewProduct = lazy(() =>
  import("./page/ShopOwner/CRUDProduct/AddNewProduct")
);
const Welcome = lazy(() => import("./page/RegisterShop/welcome"));
const RegisterPage = lazy(() => import("./page/RegisterShop/RegisterPage"));
const Step_1 = lazy(() => import("./page/RegisterShop/FormStep/Step_1"));
const Step_2 = lazy(() => import("./page/RegisterShop/FormStep/Step_2"));
const Step_3 = lazy(() => import("./page/RegisterShop/FormStep/Step_3"));
const FinalStep = lazy(() => import("./page/RegisterShop/FormStep/FinalStep"));
const AdminPage = lazy(() => import("./page/Admin/AdminPage"));
const Step_2_extra = lazy(() =>
  import("./page/RegisterShop/FormStep/Step_2_extra")
);
const Information = lazy(() => import("./page/Account/Information"));
const PurchaseDetail = lazy(() => import("./page/Account/purchaseDetail"));
const AllOrder = lazy(() => import("./page/Account/purchaseTab/AllOrder"));
const PendingOrder = lazy(() =>
  import("./page/Account/purchaseTab/PendingOrder")
);
const DoneOrder = lazy(() => import("./page/Account/purchaseTab/DoneOrder"));
const RejectOrder = lazy(() =>
  import("./page/Account/purchaseTab/RejectOrder")
);
const DeliveringOrder = lazy(() =>
  import("./page/Account/purchaseTab/DeliveringOrder")
);
const Manage_account = lazy(() =>
  import("./page/Admin/AdminManagerAccount/manage_account")
);
const ListOrders = lazy(() => import("./page/ShopOwner/Order/ListShopOrders"));
const AllShopOrder = lazy(() => import("./page/ShopOwner/Order/AllShopOrder"));
const PendingShopOrder = lazy(() =>
  import("./page/ShopOwner/Order/PendingShopOrder")
);
const DeliveringShopOrder = lazy(() =>
  import("./page/ShopOwner/Order/DeliveringShopOrder")
);
const DoneShopOrder = lazy(() =>
  import("./page/ShopOwner/Order/DoneShopOrder")
);
const RejectShopOrder = lazy(() =>
  import("./page/ShopOwner/Order/RejectShopOrder")
);
const AcceptedOrder = lazy(() =>
  import("./page/Account/purchaseTab/AcceptedOrder")
);
const AcceptedShopOrder = lazy(() =>
  import("./page/ShopOwner/Order/AcceptedShopOrder")
);
const ShopInfo = lazy(() => import("./page/ShopOwner/ShopInfo/ShopInfo"));
const ListShopAdminManager = lazy(() =>
  import("./page/Admin/AdminManagerShop/ListShopAdminManager")
);
const ShopAdminBrowser = lazy(() => import("./page/Admin/ShopAdminBrowser"));
const Admin_Detail_Shop = lazy(() =>
  import("./page/Admin/AdminManagerShop/Admin_Detail_Shop")
);
const CheckShopDetail = lazy(() => import("./page/Detail/CheckShopDetail"));
const Admin_manager_category = lazy(() =>
  import("./page/Admin/AdminManagerCategory/Admin_manager_category")
);
const Admin_manager_order = lazy(() =>
  import("./page/Admin/AdminManagerOrder/Admin_manager_order")
);
const ChangePassword = lazy(() =>
  import("./page/Account/Password/changePassword")
);
const FormRegisterOpenShop = lazy(() =>
  import("./components/FormRegisterOpenShop/FormRegisterOpenShop")
);
const Admin_manager_brands = lazy(() =>
  import("./page/Admin/AdminManagerBrands/Admin_mangager_brands")
);
const All_tag = lazy(() => import("./page/Body/AllTag/All_tag"));
const FindByTag = lazy(() => import("./page/Body/SearchData/FindByTag"));
const UpgradeToShopOwner = lazy(() => import("./page/Auth/UpgradeToShopOwner"));
const CheckoutOrder = lazy(() => import("./page/checkout/checkOrder"));
const CartDetail = lazy(() => import("./components/Cart/CartDetail"));
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { userInfoSelector } from "./redux/slice/userInfoSlice";
import { permission } from "./roleConfig/roleConfig";

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
    toast.info("Bạn đã là 1 người bán rồi");
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
      <Suspense>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={"/homePage"} replace={true} />}
          />
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/search" element={<SearchData />} />
          <Route path="/check_shop_detail" element={<CheckShopDetail />} />
          <Route path="/all_tag" element={<All_tag />} />
          <Route path="/find_by_tags" element={<FindByTag />} />

          <Route element={<ProtectedRoute />}>
            {/* user */}
            <Route path="/user" element={<DetailAccount />}>
              <Route
                path=""
                element={<Navigate to={"MyAccount"} replace={true} />}
              />
              <Route path="MyAccount" element={<Information />} />
              <Route path="changePassword" element={<ChangePassword />} />

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

            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkoutOrder" element={<CheckoutOrder />} />
            <Route path="/cartDetail" element={<CartDetail />} />

            <Route element={<ProtectRegisterRouter />}>
              {/* register shop */}
              <Route
                path="/form_register_shop_sent"
                element={<FormRegisterOpenShop />}
              />

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
                  element={
                    <Navigate to={"admin_browser_shop"} replace={true} />
                  }
                />
                <Route
                  path="admin_browser_shop"
                  element={<ShopAdminBrowser />}
                />
                <Route
                  path="admin_manage_shop"
                  element={<ListShopAdminManager />}
                />
                <Route
                  path="admin_detail_shop"
                  element={<Admin_Detail_Shop />}
                />
                <Route
                  path="admin_manage_account"
                  element={<Manage_account />}
                />
                <Route
                  path="admin_manage_category"
                  element={<Admin_manager_category />}
                />
                <Route
                  path="admin_manage_order"
                  element={<Admin_manager_order />}
                />
                <Route
                  path="admin_manage_brands"
                  element={<Admin_manager_brands />}
                />
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
                <Route path="shopInfo" element={<ShopInfo />} />

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
                  <Route
                    path="accepted_order"
                    element={<AcceptedShopOrder />}
                  />
                </Route>
              </Route>
            </Route>
          </Route>

          <Route element={<UnauthorizedRoute />}>
            <Route path="/login" element={<LoginForm formState={"login"} />} />
            <Route
              path="/signin"
              element={<LoginForm formState={"signin"} />}
            />
          </Route>
          <Route
            path="/account/verification"
            element={<AccountVerification />}
          />
          <Route
            path="/account/upgradeToShopOwner"
            element={<UpgradeToShopOwner />}
          />
          <Route path="/access-denied" element={<DeniedPage />} />
          <Route
            path="*"
            element={<Navigate to={"/access-denied"} replace={true} />}
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
