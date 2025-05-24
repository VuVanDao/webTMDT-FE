import { toast } from "react-toastify";
import authorizeAxiosInstance from "../utils/authorizeAxios";
import { apiRoot } from "../utils/constants";

// user
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

export const refreshTokenAPI = async () => {
  const response = await authorizeAxiosInstance.post(
    `${apiRoot}/v1/users/refresh_token`
  );
  return response.data;
};
export const getAllShop = async () => {
  const response = await authorizeAxiosInstance.get(
    `${apiRoot}/v1/users/get_all_shop`
  );
  return response.data;
};

//shop API
export const registerShop = async (data, logo) => {
  const response = await authorizeAxiosInstance.post(
    `${apiRoot}/v1/shops/register_shop`,
    data
  );
  return response.data;
};
export const registerShopLogo = async (logo, id) => {
  const response = await authorizeAxiosInstance.post(
    `${apiRoot}/v1/shops/register_shop_logo/${id}`,
    logo
  );
  return response.data;
};
export const getDetailShop = async (id) => {
  const response = await authorizeAxiosInstance.get(
    `${apiRoot}/v1/shops/get_detail_shop/${id}`
  );
  return response.data;
};

export const browseShop = async (data) => {
  const response = await authorizeAxiosInstance.post(
    `${apiRoot}/v1/shops/browseShop`,
    data
  );
  return response.data;
};

//product
export const createNew = async (data) => {
  const response = await authorizeAxiosInstance.post(
    `${apiRoot}/v1/products/create_new`,
    data
  );
  return response.data;
};
export const addImage = async (data, id) => {
  const response = await authorizeAxiosInstance.put(
    `${apiRoot}/v1/products/add_image/${id}`,
    data
  );
  return response.data;
};
export const getAllProduct = async (id) => {
  const response = await authorizeAxiosInstance.get(
    `${apiRoot}/v1/products/get_All_Product/${id}`
  );
  return response.data;
};
export const getProductById = async (id) => {
  const response = await authorizeAxiosInstance.get(
    `${apiRoot}/v1/products/get_Product_By_Id/${id}`
  );
  return response.data;
};
export const update = async (data) => {
  const response = await authorizeAxiosInstance.put(
    `${apiRoot}/v1/products/update`,
    data
  );
  return response.data;
};
