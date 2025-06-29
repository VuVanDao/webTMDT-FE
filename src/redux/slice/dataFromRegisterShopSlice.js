import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const dataFormRegisterShopSlice = createSlice({
  name: "dataFormRegisterShop",
  initialState: {
    dataFromRegister: null,
  },
  //noi xu li du lieu dong bo
  reducers: {
    updateDataFormRegisterShopStep1: (state, action) => {
      state.dataFromRegister = action.payload;
    },
    updateDataFormRegisterShopStep2: (state, action) => {
      state.dataFromRegister = {
        ...state.dataFromRegister,
        delivery_type: action.payload,
      };
    },
    updateDataFormRegisterShopStep2extra: (state, action) => {
      state.dataFromRegister = {
        ...state.dataFromRegister,
        description: action.payload,
      };
    },
    updateDataFormRegisterShopStep3: (state, action) => {
      state.dataFromRegister = {
        ...state.dataFromRegister,
        image: action.payload,
      };
    },
    confirmData: (state, action) => {
      state.dataFromRegister = { ...state.dataFromRegister, sent: true };
    },
    clearData: (state, action) => {
      state.dataFromRegister = null;
    },
  },
});

export const {
  updateDataFormRegisterShopStep1,
  updateDataFormRegisterShopStep2,
  updateDataFormRegisterShopStep2extra,
  updateDataFormRegisterShopStep3,
  confirmData,
  clearData,
} = dataFormRegisterShopSlice.actions; //actions: danh cho cac component goi = dispatch() cap nhat du lieu dong bo

//Selector
export const DataFormRegisterShopSelector = (state) => {
  return state.dataFormRegisterShop /*name cua slice */.dataFromRegister;
};
export const dataFormRegisterShopReducer = dataFormRegisterShopSlice.reducer;
