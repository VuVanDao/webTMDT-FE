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
export const findBrandByAlphabet = async (id) => {
  const response = await authorizeAxiosInstance.get(
    `${apiRoot}/v1/brands/find?id=${id}`
  );
  return response.data;
};
export const deleteBrand = async (id) => {
  const response = await authorizeAxiosInstance.delete(
    `${apiRoot}/v1/brands?id=${id}`
  );
  return response.data;
};
export const updateBrand = async (data, id) => {
  const response = await authorizeAxiosInstance.put(
    `${apiRoot}/v1/brands?id=${id}`,
    data
  );
  return response.data;
};
