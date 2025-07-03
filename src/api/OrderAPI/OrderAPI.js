import authorizeAxiosInstance from "../../utils/authorizeAxios";
import { apiRoot } from "../../utils/constants";

export const getOrderAPI = async (id) => {
  const response = await authorizeAxiosInstance.get(
    `${apiRoot}/v1/orders/checkout?id=${id}`
  );
  return response.data;
};
