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
export const queryBrands = async (id, data) => {
  let result = "";
  if (!data) {
    const response = await authorizeAxiosInstance.get(
      `${apiRoot}/v1/brands/find?id=${id}`
    );
    result = response.data;
  } else {
    const response = await authorizeAxiosInstance.get(
      `${apiRoot}/v1/brands/find?id=${id}&dataQuery=${data}`
    );
    result = response.data;
  }
  return result;
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
export const findBrandByTags = async (tag) => {
  const response = await authorizeAxiosInstance.post(
    `${apiRoot}/v1/brands/find`,
    tag
  );
  return response.data;
};
