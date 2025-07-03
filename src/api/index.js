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
export const getAllAccount = async () => {
  const response = await authorizeAxiosInstance.get(
    `${apiRoot}/v1/users/get_accounts`
  );
  return response.data;
};
export const createNewAccount = async (data) => {
  const response = await authorizeAxiosInstance.post(
    `${apiRoot}/v1/users`,
    data
  );
  toast.success(`Account created successfully`, { theme: "colored" });
  return response.data;
};
export const updateAccount = async (data) => {
  const response = await authorizeAxiosInstance.put(
    `${apiRoot}/v1/users/update`,
    data
  );
  return response.data;
};
export const deleteAccount = async (id) => {
  const response = await authorizeAxiosInstance.delete(
    `${apiRoot}/v1/users?id=${id}`
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
    `${apiRoot}/v1/users/getAllShop`
  );
  return response.data;
};
export const getAllProductUser = async () => {
  const response = await authorizeAxiosInstance.get(
    `${apiRoot}/v1/users/get_All_Product`
  );
  return response.data;
};
export const fetchProductAPI = async (searchPath) => {
  const response = await authorizeAxiosInstance.get(
    `${apiRoot}/v1/products${searchPath}`
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
export const updateShopInfo = async (data) => {
  const response = await authorizeAxiosInstance.put(
    `${apiRoot}/v1/shops`,
    data
  );
  return response.data;
};
export const getAllShopAdminManager = async () => {
  const response = await authorizeAxiosInstance.get(`${apiRoot}/v1/shops`);
  return response.data;
};
export const deleteOneShop = async (id) => {
  const response = await authorizeAxiosInstance.delete(
    `${apiRoot}/v1/shops?id=${id}`
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
export const deleteProduct = async (id) => {
  const response = await authorizeAxiosInstance.delete(
    `${apiRoot}/v1/products?id=${id}`
  );
  return response.data;
};
export const findProductAPI = async (data) => {
  const response = await authorizeAxiosInstance.post(
    `${apiRoot}/v1/products`,
    data
  );
  return response.data;
};

//order
export const createNewOrder = async (data) => {
  const response = await authorizeAxiosInstance.post(
    `${apiRoot}/v1/orders`,
    data
  );
  return response.data;
};
export const getOderByStatus = async (data) => {
  const response = await authorizeAxiosInstance.get(
    `${apiRoot}/v1/orders?statusOrder=${data.statusOrder}&customerId=${data.customerId}`
  );
  return response.data;
};
export const getOrderByShopId = async (id) => {
  const response = await authorizeAxiosInstance.get(
    `${apiRoot}/v1/orders/get_by_shop_id?id=${id}`
  );
  return response.data;
};
export const updateOrder = async (data, id) => {
  const response = await authorizeAxiosInstance.put(
    `${apiRoot}/v1/orders/update/${id}`,
    data
  );
  return response.data;
};
export const deleteOrder = async (id) => {
  const response = await authorizeAxiosInstance.delete(
    `${apiRoot}/v1/orders?orderId=${id}`
  );
  return response.data;
};
export const getOderByAdmin = async () => {
  const response = await authorizeAxiosInstance.get(
    `${apiRoot}/v1/orders/get_orders_by_admin`
  );
  return response.data;
};
//notification
export const newNotification = async (data) => {
  const response = await authorizeAxiosInstance.post(
    `${apiRoot}/v1/notifications`,
    data
  );
  return response.data;
};
export const getNotification = async (id) => {
  const response = await authorizeAxiosInstance.get(
    `${apiRoot}/v1/notifications?id=${id}`
  );
  return response.data;
};
export const deleteNotification = async (notificationId) => {
  const response = await authorizeAxiosInstance.delete(
    `${apiRoot}/v1/notifications?notificationId=${notificationId}`
  );
  return response.data;
};

//category
export const createNewCategory = async (data) => {
  const response = await authorizeAxiosInstance.post(
    `${apiRoot}/v1/categories`,
    data
  );
  return response.data;
};
export const getAllCategory = async () => {
  const response = await authorizeAxiosInstance.get(`${apiRoot}/v1/categories`);
  return response.data;
};
export const searchCategory = async (searchPath) => {
  const response = await authorizeAxiosInstance.get(
    `${apiRoot}/v1/categories/search${searchPath}`
  );
  return response.data;
};
export const deleteCategory = async (id) => {
  const response = await authorizeAxiosInstance.delete(
    `${apiRoot}/v1/categories?id=${id}`
  );
  return response.data;
};

//checkout
export const checkoutAPI = async (price) => {
  const response = await authorizeAxiosInstance.post(
    `${apiRoot}/v1/orders/checkout`,
    price
  );
  return response.data;
};
