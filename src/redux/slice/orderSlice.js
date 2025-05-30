import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRoot } from "../../utils/constants";
import authorizeAxiosInstance from "../../utils/authorizeAxios";

export const getOrdersAPIReduxById = createAsyncThunk(
  "orderInfo/getOrdersAPIReduxById",
  async (id) => {
    const response = await authorizeAxiosInstance.get(
      `${apiRoot}/v1/orders/get_by_shop_id?id=${id}`
    );
    return response.data;
  }
);
export const orderSlice = createSlice({
  name: "orderInfo",
  initialState: {
    orderInfo: null,
  },
  //   reducers: {},

  //extraReducer : noi xu li du lieu bat dong bo
  extraReducers: (builder) => {
    builder.addCase(
      getOrdersAPIReduxById.fulfilled /*ten function */,
      (state, action) => {
        // action.payload chinh la response.data
        const data = action.payload;
        state.orderInfo = data;
      }
    );
  },
});

export const {} = orderSlice.actions;

//Selector
export const orderSliceSelector = (state) => {
  return state.orderInfo /*name cua slice */.orderInfo;
};
export const orderSliceReducer = orderSlice.reducer;
