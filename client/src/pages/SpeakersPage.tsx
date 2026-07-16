import React from "react";
import CartegoryPageLayout from "../components/CartegoryPageLayout";
import { useStore } from "../context/StoreContext";
import RollerLoader from "../components/RollerLoader";

const SpeakersPage: React.FC = () => {
  const { getProductsByCategory, loading } = useStore();

  if (loading) {
    return <RollerLoader />;
  }
  const speakers = getProductsByCategory("speakers");

  return <CartegoryPageLayout title="Speakers" products={speakers} />;
};

export default SpeakersPage;
