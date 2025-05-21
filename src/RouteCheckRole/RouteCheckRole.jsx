import React from "react";
import { usePermission } from "../customHook/usePermission";
import { roles } from "../roleConfig/roleConfig";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../redux/slice/userInfoSlice";

const RouteCheckRole = ({
  requiredPermission,
  redirectTo = "/access-denied",
}) => {
  // console.log("🚀 ~ requiredPermission:", requiredPermission);

  const user = useSelector(userInfoSelector);
  const userRole = user?.role || roles.CUSTOMER;
  const { hasPermission } = usePermission(userRole);

  //neu user ko co quyen han thi doi huwong ve redirectTo
  if (!hasPermission(requiredPermission)) {
    return <Navigate to={redirectTo} replace="true" />;
  }
  return <Outlet />;
};

export default RouteCheckRole;
