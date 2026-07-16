import CartegoryPageLayout from "../components/CartegoryPageLayout";
import RollerLoader from "../components/RollerLoader";
import { useStore } from "../context/StoreContext";

const HeadphonesPage: React.FC = () => {
  // Get headphone products from context (already fetched globally)
  const { getProductsByCategory, loading } = useStore();

  if (loading) {
    return <RollerLoader />;
  }

  const headphones = getProductsByCategory("headphones");

  return <CartegoryPageLayout title="HEADPHONES" products={headphones} />;
};

export default HeadphonesPage;
