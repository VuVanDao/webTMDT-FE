import authorizeAxiosInstance from "../../utils/authorizeAxios";
import { apiRoot } from "../../utils/constants";

export const findTagByAlphabet = async (id) => {
  const response = await authorizeAxiosInstance.get(
    `${apiRoot}/v1/categories/findByAlphabet?id=${id}`
  );
  return response.data;
};
