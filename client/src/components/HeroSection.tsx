import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

const heroImage =
  "https://res.cloudinary.com/ddhfphlho/image/upload/v1780575017/heroimage_rpjwbn.png";

const HeroSection: React.FC = () => {
  const { products } = useStore();

  // Find the featured products - the XX99 Mark II
  const featuredProduct = products.find((product) => {
    return product.name.includes("XX99 Mark II");
  });

  return (
    <header className="bg-[#131313] relative overflow-hidden">
      <div className="px-6 sm:px-[clamp(1rem,11.40vw,200px)]">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-132 md:min-h-182.25 lg:min-h-157.75 py-16 md:py-20 lg:py-0 relative">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4 lg:gap-14 z-10 max-w-95 mt-15 xl:pl-7 2xl:pl-30 lg:pl-7 md:pl-1 ">
            <div className="flex flex-col lg:gap-6 gap-4">
              <p className="text-[14px] tracking-[10px] text-white/50 uppercase">
                New Product
              </p>
              <h1 className="text-[36px] font-bold md:text-[56px] leading-tight tracking-[2px] uppercase text-white">
                XX99 Mark II <br className="hidden md:inline " /> Headphones
              </h1>
              <p className="text-[15px] leading-relaxed text-white/50 max-w-99 ">
                Experience natural, lifelike audio and exceptional build quality
                made for the passionate music enthusiast.
              </p>
            </div>
            <div className="md:flex-row items-center md:gap-5 flex-col gap-2 flex ">
              {featuredProduct ? (
                <Link to={`/product/${featuredProduct._id}`}>
                  <button className="bg-[#d87d4a] text-white font-bold text-[13px] tracking-[1px] uppercase px-8 py-4 hover:bg-[#fbaf85] transition-colors duration-200 cursor-pointer w-[170px]">
                    See Product
                  </button>
                </Link>
              ) : (
                <Link to="/headphones">
                  <button className="bg-[#d87d4a] text-white font-bold text-[13px] tracking-[1px] uppercase px-8 py-4 hover:bg-[#fbaf85] transition-colors duration-200 cursor-pointer w-[170px]">
                    See Product
                  </button>
                </Link>
              )}
              <Link to="/register">
                <button className="text-[16px] font-bold text-white tracking-[1px] hover:text-[#d87d4a] transition-colors uppercase px-11 py-4 border border-[#ffffff] ">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
          <div
            className="lg:flex md:flex w-full lg:w-[55%] xl:w-[40%] right-20 md:-right-27 -top-15 lg:top-23.75 lg:right-17.5 z-0 mt-8 lg:mt-0 md:-top-3.5 absolute  
  md:-translate-[30%]"
          >
            <img
              src={heroImage}
              alt=""
              className="max-w-125 lg:max-w-none  mx-auto lg:mx-0  z-0  "
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
