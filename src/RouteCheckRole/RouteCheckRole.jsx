import React from "react";
import { usePermission } from "../customHook/usePermission";
import { roles } from "../roleConfig/roleConfig";
import { Navigate, Outlet } from "react-router-dom";

const RouteCheckRole = ({
  requiredPermission,
  redirectTo = "/access-denied",
}) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const userRole = user?.role || roles.CUSTOMER;
  const { hasPermission } = usePermission(userRole);

  //neu user ko co quyen han thi doi huwong ve redirectTo
  if (!hasPermission(requiredPermission)) {
    return <Navigate to={redirectTo} replace="true" />;
  }
  return <Outlet />;
};

export default RouteCheckRole;
