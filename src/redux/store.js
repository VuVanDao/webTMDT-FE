import { configureStore } from "@reduxjs/toolkit";
import { dataFormRegisterShopReducer } from "./slice/dataFromRegisterShopSlice";
export default configureStore({
  reducer: {
    dataFormRegisterShop: dataFormRegisterShopReducer,
  },
});
