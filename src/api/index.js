import { toast } from "react-toastify";
import authorizeAxiosInstance from "../utils/authorizeAxios";
import { apiRoot } from "../utils/constants";

export const registerUserAPI = async (data) => {
  const response = await authorizeAxiosInstance.post(
    `${apiRoot}/v1/users/register`,
    data
  );
  toast.success(
    `Account created successfully, plz check ${response?.data?.email} and verify your account`,
    { theme: "colored" }
  );
  return response.data;
};

export const verifyUserAPI = async (data) => {
  //{email,token}
  const response = await authorizeAxiosInstance.put(
    `${apiRoot}/v1/users/verify`,
    data
  );
  toast.success(
    "Your account verified successfully, enjoy our service 😁😁😁",
    { theme: "colored" }
  );
  return response.data;
};
export const loginUserAPI = async (data) => {
  const response = await authorizeAxiosInstance.post(
    `${apiRoot}/v1/users/login`,
    data
  );
  toast.success("Login successful 😁😁😁", { theme: "colored" });
  return response.data;
};
export const logoutUserAPI = async () => {
  const response = await authorizeAxiosInstance.delete(
    `${apiRoot}/v1/users/logout`
  );
  toast.success("Logout successful 😁😁😁", { theme: "colored" });
  return response.data;
};
export const refreshTokenAPI = async () => {
  const response = await authorizeAxiosInstance.post(
    `${apiRoot}/v1/users/refresh_token`
  );
  return response.data;
};
export const registerShop = async (data) => {
  const response = await authorizeAxiosInstance.post(
    `${apiRoot}/v1/shops/register_shop`,
    data
  );
  return response.data;
};
