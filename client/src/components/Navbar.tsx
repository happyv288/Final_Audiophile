import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { MdChevronRight } from "react-icons/md";

const navlogo =
  "https://res.cloudinary.com/dncexht1z/image/upload/v1780492834/Desktop_nav_logo_bbhdrb.png";

const mobiledbheadphone =
  "https://res.cloudinary.com/ddhfphlho/image/upload/v1780497464/mobiledbheadphone_knb2ij.png";

const mobileddspeaker =
  "https://res.cloudinary.com/ddhfphlho/image/upload/v1780497464/mobileddspeaker_u1t2ko.png";

const mobileddearpod =
  "https://res.cloudinary.com/ddhfphlho/image/upload/v1780497464/mobileddearpod_rjfina.png";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navLinks = [
    { to: "/", label: "HOME" },
    { to: "/headphones", label: "HEADPHONES" },
    { to: "/speakers", label: "SPEAKERS" },
    { to: "/earphones", label: "EARPHONES" },
  ];
  return (
    <nav className="bg-[#101010]">
      <div className="pt-4 md:pt-6.25 w-full sm:px-[clamp(1rem,11.40vw,200px)] px-6 ">
        <div className="flex items-center justify-between pb-8 pt-3 md:pt-0 md:pb-6.25">
          <button
            className="lg:hidden text-white text-2xl shrink-0"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            {isMenuOpen ? <IoClose /> : <GiHamburgerMenu />}
          </button>
          <Link to="/">
            <img src={navlogo} alt="" />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-[16px] font-bold text-white tracking-[2px] hover:text-[#D87D4A] transition-colors"
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <button className="relative text-white hover:text-[#d87d4a] transition-colors flex items-center gap-2">
              <LuShoppingCart className="text-[22px]" />{" "}
              <span className="text-[16px] fonr-bold text-white tracking-[1px] hover:text-[#d87d4a] transition-colors uppercase hidden md:inline-block">
                CART
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/login"
                className="text-[16px] font-bold text-white tracking-[1px] hover:text-[#d87d4a] transition-colors uppercase lg:py-2.5 lg:px-5 border border-[#ffffff]"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text=[16px] font-bold text-white tracking-[1px] hover:text-[#fbaf85] transition-colors uppercase lg:py-2.5 lg:px-5 bg-[#d87d4a]"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>

        {/* mobile dropdown */}
        {isMenuOpen && (
          <div
            className="py-8 px-0 absolute top-22 left-0 right-0 bg-white rounded-b-xl shadow-2xl z-50 animate-[slideDown_0.3s_ease-out] lg:hidden"
            style={{
              ["--tw-keyframes-slidedown" as string]: `from {opacity: 0; transform: translateY(-10px);} to {opacity: 1; transform: translateY(0);}`,
            }}
          >
            <div className="px-6 md:px-10 lg:px-12 xl:px-[5.5%]">
              <div className="flex flex-col md:flex-row gap-14 pt-10">
                {[
                  {
                    to: "/headphones",
                    label: "HEADPHONES",
                    img: mobiledbheadphone,
                  },
                  {
                    to: "/speakers",
                    label: "SPEAKERS",
                    img: mobileddspeaker,
                  },
                  {
                    to: "/earphones",
                    label: "EARPHONES",
                    img: mobileddearpod,
                  },
                ].map((cat) => {
                  return (
                    <Link
                      key={cat.to}
                      to={cat.to}
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                      className="flex-1 bg-[#f1f1f1] rounded-lg relative h-41.25 pt-22.5 pb-5 group"
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex justify-center">
                        <img src={cat.img} alt="" />
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <h4 className="text-[15px] font-bold tracking-[1px] text-black">
                          {cat.label}
                        </h4>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-black/50 group-hover:text-[#d87d48] uppercase">
                            Shop
                          </span>
                          <MdChevronRight className="text-[#d87d48]" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* auth links in mobile menu */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex gap-4">
                  <Link
                    to="/login"
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                    className="flex-1 text-center py-3 border-2 border-black font-bold text-[13px] uppercase tracking-[1px]"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                    className="flex-1 text-center py-3 border-2 border-black font-bold text-[13px] uppercase tracking-[1px]"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
