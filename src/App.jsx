import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage/HomePage";
import Detail from "./page/Detail/Detail";
import CheckoutPage from "./page/checkout/checkout";

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
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route
          path="*"
          element={<Navigate to={"/homePage"} replace={true} />}
        />
      </Routes>
    </>
  );
};

export default App;
