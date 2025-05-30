export const roles = {
  CUSTOMER: "customer",
  ADMIN: "admin",
  SHOP_OWNER: "shop_owner",
};
export const permission = {
  admin: "admin",
  shop_detail: "shop_detail",
  create_products: "addNewProduct",
  list_products: "getAllProduct",
};
export const rolePermission = {
  [roles.ADMIN]: Object.values(permission),
  [roles.SHOP_OWNER]: [
    permission.shop_detail,
    permission.create_products,
    permission.list_products,
  ],
};
