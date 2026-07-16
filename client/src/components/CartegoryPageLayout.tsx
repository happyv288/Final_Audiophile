import React from "react";
import type { Product } from "../types";
import ProductCard from "./ProdultCard";
import "../App.css";
import CategoryCard from "./CategoryCard";
import Man from "./Man";

const cartHeadphone =
  "https://res.cloudinary.com/ddhfphlho/image/upload/v1780583436/cartheadphone_ev5rl6.png";
const cartSpeatker =
  "https://res.cloudinary.com/ddhfphlho/image/upload/v1780583436/cartspeaker_yojn9g.png";
const cartEarpod =
  "https://res.cloudinary.com/ddhfphlho/image/upload/v1780583436/cartearpod_u6mk6a.png";
interface CategoryPageLayoutProps {
  // Page title shown in the black banner (e.g "HEADPHONES")
  title: string;
  // Array of products to display
  products: Product[];
}

const CartegoryPageLayout: React.FC<CategoryPageLayoutProps> = ({
  title,
  products,
}) => {
  return (
    <div className="bg-[#fafafa] animate-[fadeIn_0.4s_ease-in]">
      {/* ------------- Black title banner --------- */}
      <div className="bg-black py-8 md:py-12 lg:py-24.5">
        <h1 className="text-center font-bold text-[28px] md:text-[40px] trackimg-[2px] md:tracking-[3px] uppercase text-white">
          {title}
        </h1>
      </div>

      {/* ------- PRODUCT LIST ------- */}
      <section className="px-6 sm:px-[clamp(1rem,11.40vw,200px)] mt-16 md:mt-32 lg:mt-40">
        <div className="flex flex-col gap-20 md:gap-28 lg:gap-40">
          {products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard
                key={product._id}
                product={product}
                // Alternate image left/right on every other product
                reversed={index % 2 !== 0}
              />
            ))
          ) : (
            // Graceful empty state
            <div className="text-center py-20">
              <p className="text-black/50">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ----- Category Navigation card---- */}
      <section className="px-6 sm:px-[clamp(1rem,11.40vw,200px)] mt-24 md:mt-32 lg:mt-40">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-4 lg:gap-8 pt-12 md:pt-0 mt-6 md:mt-14">
          <CategoryCard
            to="/headphones"
            label="HEADPHONES"
            image={cartHeadphone}
            className="mt-8 md:mt-12"
          />

          <CategoryCard
            to="/speakers"
            label="SPEAKERS"
            image={cartSpeatker}
            className="mt-8 md:mt-12"
          />
          <CategoryCard
            to="/earphones"
            label="EARPHONES"
            image={cartEarpod}
            className="mt-8 md:mt-12"
          />
        </div>
      </section>
      <Man />
    </div>
  );
};

export default CartegoryPageLayout;
