import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage/HomePage";
import Detail from "./page/Detail/Detail";
import CheckoutPage from "./page/checkout/checkout";
import SearchData from "./page/Body/SearchData/searchData";
import LoginForm from "./page/Login/LoginSigninForm";
import AccountVerification from "./page/Auth/AccountVerification";

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
        <Route element={<ProtectedRoute />}>
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
        <Route path="/search" element={<SearchData />} />
        <Route element={<UnauthorizedRoute />}>
          <Route path="/login" element={<LoginForm formState={"login"} />} />
          <Route path="/signin" element={<LoginForm formState={"signin"} />} />
        </Route>
        <Route path="/account/verification" element={<AccountVerification />} />
        <Route
          path="*"
          element={<Navigate to={"/homePage"} replace={true} />}
        />
      </Routes>
    </>
  );
};

export default App;
