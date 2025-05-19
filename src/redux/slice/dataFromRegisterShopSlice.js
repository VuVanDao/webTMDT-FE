import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authorizeAxiosInstance from "../../utils/authorizeAxios";

// hanh dong goi api bat dong bo, cap nhat du lieu vao redux, dung middleware createAsyncThunk di kem vs extraReducer
// export const registerShop = createAsyncThunk(
//   "dataFormRegisterShop/registerShop",
//   async (data) => {
//     console.log("🚀 ~ data:", data);
//     // const response = await authorizeAxiosInstance.get(data);
//     // return response.data;
//   }
// );

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
    // updateDataFormRegisterShopStep3: (state, action) => {
    //   state.dataFromRegister = {
    //     ...state.dataFromRegister,
    //     logo: action.payload,
    //   };
    // },
  },
  //extraReducer : noi xu li du lieu bat dong bo
  // extraReducers: (builder) => {
  //   builder.addCase(
  //     registerShop.fulfilled /*ten function */,
  //     (state, action) => {
  //       // action.payload chinh la response.data
  //       const data = action.payload;
  //       state.dataFromRegister = data;
  //     }
  //   );
  // },
});

export const {
  updateDataFormRegisterShopStep1,
  updateDataFormRegisterShopStep2,
  updateDataFormRegisterShopStep3,
} = dataFormRegisterShopSlice.actions; //actions: danh cho cac component goi = dispatch() cap nhat du lieu dong bo

//Selector
export const DataFormRegisterShopSelector = (state) => {
  return state.dataFormRegisterShop /*name cua slice */.dataFromRegister;
};
export const dataFormRegisterShopReducer = dataFormRegisterShopSlice.reducer;
