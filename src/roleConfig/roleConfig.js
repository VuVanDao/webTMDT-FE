export const roles = {
  CUSTOMER: "customer",
  ADMIN: "admin",
  SHOP_OWNER: "shop_owner",
};
export const permission = {
  admin: "admin",
  shop_detail: "shop_detail",
};
export const rolePermission = {
  [roles.ADMIN]: Object.values(permission),
  [roles.SHOP_OWNER]: [permission.shop_detail],
};
