import authorizeAxiosInstance from "../../utils/authorizeAxios";
import { apiRoot } from "../../utils/constants";

export const getDetailShopByOwner = async (id) => {
  const response = await authorizeAxiosInstance.get(
    `${apiRoot}/v1/shops/get_detail_shop_by_owner?id=${id}`
  );
  return response.data;
};
