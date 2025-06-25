import authorizeAxiosInstance from "../../utils/authorizeAxios";
import { apiRoot } from "../../utils/constants";

export const getAllBrand = async () => {
  const response = await authorizeAxiosInstance.get(`${apiRoot}/v1/brands`);
  return response.data;
};
export const createNewBrand = async (data) => {
  const response = await authorizeAxiosInstance.post(
    `${apiRoot}/v1/brands`,
    data
  );
  return response.data;
};
