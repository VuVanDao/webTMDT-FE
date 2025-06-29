import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authorizeAxiosInstance from "../../utils/authorizeAxios";
import { toast } from "react-toastify";
import { apiRoot } from "../../utils/constants";

// hanh dong goi api bat dong bo, cap nhat du lieu vao redux, dung middleware createAsyncThunk di kem vs extraReducer
export const loginUserAPI = createAsyncThunk(
  "userInfo/loginUser",
  async (data) => {
    const response = await authorizeAxiosInstance.post(
      `${apiRoot}/v1/users/login`,
      data
    );
    return response.data;
  }
);
export const logoutUserAPI = createAsyncThunk(
  "userInfo/logoutUser",
  async () => {
    const response = await authorizeAxiosInstance.delete(
      `${apiRoot}/v1/users/logout`
    );
    return response.data;
  }
);
export const updateUserAPI = createAsyncThunk(
  "userInfo/updateUserAPI",
  async (data) => {
    const response = await authorizeAxiosInstance.put(
      `${apiRoot}/v1/users/update`,
      data
    );
    return response.data;
  }
);

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    userInfo: null,
  },
  //noi xu li du lieu dong bo
  reducers: {
    sentFormRegister: (state, action) => {
      state.userInfo = { ...state.userInfo, sentForm: true };
    },
  },
  //extraReducer : noi xu li du lieu bat dong bo
  extraReducers: (builder) => {
    builder.addCase(
      loginUserAPI.fulfilled /*ten function */,
      (state, action) => {
        // action.payload chinh la response.data
        const data = action.payload;
        state.userInfo = data;
        toast.success("Login successful 😁😁😁", { theme: "colored" });
      }
    );
    builder.addCase(
      logoutUserAPI.fulfilled /*ten function */,
      (state, action) => {
        state.userInfo = null;
        toast.success("Logout successful 😁😁😁", { theme: "colored" });
      }
    );
    builder.addCase(
      updateUserAPI.fulfilled /*ten function */,
      (state, action) => {
        state.userInfo = action.payload;
      }
    );
  },
});

export const { sentFormRegister } = userInfoSlice.actions;

//Selector
export const userInfoSelector = (state) => {
  return state.userInfo /*name cua slice */.userInfo;
};
export const userInfoReducer = userInfoSlice.reducer;
