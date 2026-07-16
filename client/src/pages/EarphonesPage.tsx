import React from "react";
import CartegoryPageLayout from "../components/CartegoryPageLayout";
import { useStore } from "../context/StoreContext";
import RollerLoader from "../components/RollerLoader";

const EarphonesPage: React.FC = () => {
  const { getProductsByCategory, loading } = useStore();

  if (loading) {
    return <RollerLoader />;
  }
  const earphones = getProductsByCategory("earphones");
  return <CartegoryPageLayout title="Earphones" products={earphones} />;
};

export default EarphonesPage;
