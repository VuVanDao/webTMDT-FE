import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage/HomePage";
import Detail from "./page/Detail/Detail";
import CheckoutPage from "./page/checkout/checkout";
import SearchData from "./page/Body/SearchData/searchData";

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
        <Route path="/search" element={<SearchData />} />
        <Route
          path="*"
          element={<Navigate to={"/homePage"} replace={true} />}
        />
      </Routes>
    </>
  );
};

export default App;
