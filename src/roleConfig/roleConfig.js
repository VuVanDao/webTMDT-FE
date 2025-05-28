export const roles = {
  CUSTOMER: "customer",
  ADMIN: "admin",
  SHOP_OWNER: "shop_owner",
};
export const permission = {
  admin_manage_shop: "admin/admin_manage_shop",
  admin_dashboard: "admin/admin_dashboard",
  admin_manage_user: "admin/admin_manage_user",
  admin: "admin",
  shop_detail: "shop_detail",
  create_products: "create_products",
  list_products: "list_products",
  update_info_products: "update_info_products",
  delete_products: "delete_products",
};
export const rolePermission = {
  [roles.ADMIN]: Object.values(permission),
  [roles.SHOP_OWNER]: [
    permission.shop_detail,
    permission.create_products,
    permission.list_products,
    permission.update_info_products,
    permission.delete_products,
  ],
};
