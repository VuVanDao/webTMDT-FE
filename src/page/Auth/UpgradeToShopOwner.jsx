import React, { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import PageLoadingSpinner from "../../components/Loading/PageLoadingSpinner";
import { verifyUserAPI } from "../../api";
import { verifyShop } from "../../api/shopAPI/shopAPI";

const UpgradeToShopOwner = () => {
  let [searchParams] = useSearchParams();

  const { id, token } = Object.fromEntries([...searchParams]);
  const [verified, setVerified] = useState(false);

  if (!id || !token) {
    <Navigate to={"/404"} />;
  }
  useEffect(() => {
    if (id && token) {
      verifyShop({ id, token }).then(() => {
        setVerified(true);
      });
    }
  }, [id, token]);
  if (!verified) {
    return <PageLoadingSpinner caption={"verifying  ...."} />;
  }
  return <Navigate to={`/login?verifiedShop=${id}`} />;
};

export default UpgradeToShopOwner;
