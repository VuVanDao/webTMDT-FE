import { rolePermission } from "../roleConfig/roleConfig";
//custom hook cho viec kiem tra quyen han cho user
export const usePermission = (userRole) => {
  const hasPermission = (permission) => {
    const allowedPermissions = rolePermission[userRole] || []; //tra ve mang cac permission cua userRole
    console.log("🚀 ~ hasPermission ~ allowedPermissions:", allowedPermissions);
    return allowedPermissions.includes(permission); //kiem tra xem co permission muon su dung khong
  };
  return { hasPermission };
};
