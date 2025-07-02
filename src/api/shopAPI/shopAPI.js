import authorizeAxiosInstance from "../../utils/authorizeAxios";
import { apiRoot } from "../../utils/constants";

export const getDetailShopByOwner = async (id) => {
  const response = await authorizeAxiosInstance.get(
    `${apiRoot}/v1/shops/get_detail_shop_by_owner?id=${id}`
  );
  return response.data;
};
export const verifyShop = async (data) => {
  const response = await authorizeAxiosInstance.post(
    `${apiRoot}/v1/shops/verifyShop`,
    data
  );
  return response.data;
};
export const cancelRegisterShop = async (id) => {
  const response = await authorizeAxiosInstance.delete(
    `${apiRoot}/v1/shops/verifyShop?id=${id}`
  );
  return response.data;
};
