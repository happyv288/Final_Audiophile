import React, { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { MdChevronRight } from "react-icons/md";
import { useStore } from "../context/StoreContext";
import { useAuth } from "../context/AuthContext";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import "../App.css";
import { FiUser, FiSettings, FiLogOut, FiShoppingBag } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

const navlogo =
  "https://res.cloudinary.com/dncexht1z/image/upload/v1780492834/Desktop_nav_logo_bbhdrb.png";

const mobiledbheadphone =
  "https://res.cloudinary.com/ddhfphlho/image/upload/v1780497464/mobiledbheadphone_knb2ij.png";

const mobileddspeaker =
  "https://res.cloudinary.com/ddhfphlho/image/upload/v1780497464/mobileddspeaker_u1t2ko.png";

const mobileddearpod =
  "https://res.cloudinary.com/ddhfphlho/image/upload/v1780497464/mobileddearpod_rjfina.png";

const Navbar: React.FC = () => {
  const { setIsCartOpen, cart } = useStore();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Mobile menu (hamburger) open state
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // User avatar dropdown open state
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  // Ref for tge dropdown - used to close it when clicking outside
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Total items in cart (sum of all quantities)
  const cartItemCount = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  //  close dropdown when clicking anywhere outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  // Handle logout click
  const handleLogout = (): void => {
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

  // Navigation links - shared between desktop and mobile
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
          {/* Mobile Hamburger button  */}
          <button
            className="lg:hidden text-white text-2xl shrink-0"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            {/* <GiHamburgerMenu /> */}
            {isMenuOpen ? <IoClose /> : <GiHamburgerMenu />}
          </button>
          {/*-- ---------Logo-------------- */}
          <Link to="/" className="flex gap-2.5">
            <img src={navlogo} alt="" className="md:w-full w-30" />
          </Link>
          {/* -----------Desktop Navigation Links ----------- */}
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

          {/* ------ --------Right side cart + Auth     ------ */}
          <div className="flex items-center gap-6 shrink-0">
            <button
              onClick={() => {
                return setIsCartOpen(true);
              }}
              className="relative text-white hover:text-[#d87d4a] transition-colors flex items-center gap-2 "
              aria-label="Open cart"
            >
              {" "}
              <LuShoppingCart className="text-[22px] " />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#d87d4a] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
              <span className="text-[16px] font-bold text-white tracking-[1px] hover:text-[#d87d4a] transition-colors uppercase hidden md:inline-block">
                CART
              </span>
            </button>

            {/* --------------------Auth Section------- ----  */}
            {user ? (
              // -------------Logged In: Avatar + Dropdaown
              <div className="relative hidden lg:block" ref={dropdownRef}>
                <button
                  onClick={() => {
                    return setDropdownOpen(!isDropdownOpen);
                  }}
                  className="flex items-center gap-2 text-white hover:text-[#d87d4a] transition-colors"
                >
                  {/* --------Avatar: show image or initials fallback ------- */}
                  <div className="w-8 h-8 rounded-full bg-[#d87d4a] flex items-center overflow-hidden">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-xs font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <MdKeyboardArrowDown
                    className={`text-sm transition-transform ${isDropdownOpen ? "rotate-0" : ""}`}
                  />
                </button>

                {/* {----------------Dropdown Menu------------} */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-12 w-52 bg-white rounded-lg shadow-xl py-2 z-50 animate-[fadeIn-0.4s-ease-in]">
                    {/* ------------User info header----------- */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-bold text-sm text-black">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* ---------------------Admin link - only shown to admins ------------*/}
                    {user.isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => {
                          return setDropdownOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-3 text-base text-gray-700 hover:bg-[#d87d4a] hover:text-white transition-colors"
                      >
                        <MdDashboard className="text-base" /> Admin Dashboard
                      </Link>
                    )}
                    <Link
                      to="/profile"
                      onClick={() => {
                        return setDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 text-base text-gray-700 hover:bg-gray-50 transition-colors "
                    >
                      {" "}
                      <FiSettings className="text-base" />
                      Profile Settings
                    </Link>

                    <Link
                      to="/orders"
                      onClick={() => {
                        return setDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 text-base  text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {" "}
                      <FiShoppingBag className="text-base" />
                      My orders{" "}
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 text-base text-red-500 transition-colors w-full text-left"
                    >
                      <FiLogOut className="text-base" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
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
            )}
          </div>
        </div>

        {/* ------------mobile dropdown---------- */}
        {isMenuOpen && (
          <div
            className="py-8 px-0 absolute top-22 left-0 right-0 bg-white rounded-b-xl shadow-2xl z-50 animate-[slideDown_0.3s_ease-out] lg:hidden"
            style={{
              ["--tw-keyframes-slidedown" as string]: `from {opacity: 0; transform: translateY(-10px);} to {opacity: 1; transform: translateY(0);}`,
            }}
          >
            <div className="px-6 md:px-10 lg:px-12 xl:px-[5.5%]">
              {/*------------- Category cards------------ */}
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

              {/* -------------auth links in mobile menu------------ */}
              {user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#d87d4a] flex items-center justify-between overflow-hidden">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold">
                          {user.name.charAt(0).toLocaleUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => {
                        return setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-2 text-sm font-bold text-[#d87d4a]"
                    >
                      <MdDashboard />
                      Admin Dashborad
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    onClick={() => {
                      return setIsMenuOpen(false);
                    }}
                    className="text-sm font-bold text-black/70"
                  >
                    ⚙️ profile setting
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => {
                      return setIsMenuOpen(false);
                    }}
                    className="text-sm font-bold text-black/70"
                  >
                    📦 my orders
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-sm font-bold text-red-500 text-left"
                  >
                    🔙 logout
                  </button>
                </div>
              ) : (
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
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
