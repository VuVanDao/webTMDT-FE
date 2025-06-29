export const findFormRegisterById = async (id) => {
  const response = await authorizeAxiosInstance.get(
    `${apiRoot}/v1/brands/find?id=${id}`
  );
  return response.data;
};
