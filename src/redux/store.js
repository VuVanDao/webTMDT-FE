import { configureStore } from "@reduxjs/toolkit";
import { dataFormRegisterShopReducer } from "./slice/dataFromRegisterShopSlice";
import { userInfoReducer } from "./slice/userInfoSlice";

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootPersistConfig = {
  key: "root",
  storage: storage, //luu vao localStorage
  whitelist: ["userInfo"], // cho phep duy tri qua moi lan f5 browser
};

const reducers = combineReducers({
  dataFormRegisterShop: dataFormRegisterShopReducer,
  userInfo: userInfoReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});
