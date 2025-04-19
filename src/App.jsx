import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./page/HomePage/HomePage";
const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={"/homePage"} replace={true} />}
        />
        <Route path="/homePage" element={<HomePage />} />
        <Route
          path="*"
          element={<Navigate to={"/homePage"} replace={true} />}
        />
      </Routes>
    </>
  );
};

export default App;
