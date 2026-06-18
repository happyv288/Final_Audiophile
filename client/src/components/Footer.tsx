import React from "react";
import { Link } from "react-router-dom";
import { ImFacebook2 } from "react-icons/im";
import { FaTwitter } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";

const footerlogo =
  "https://res.cloudinary.com/dncexht1z/image/upload/v1780492834/Desktop_nav_logo_bbhdrb.png";
const footerLogoMobile =
  "https://res.cloudinary.com/ddhfphlho/image/upload/v1780569728/footerLogo_bvhmqz.png";

const Footer: React.FC = () => {
  const footerLinks = [
    { to: "/", label: "HOME" },
    { to: "/headphones", label: "HEADPHONES" },
    { to: "/speakers", label: "SPEAKERS" },
    { to: "/earphones", label: "EARPHONES" },
  ];
  return (
    <footer className="px-6 sm:px px-[clamp(1rem,11.40vw,200px)] bg-[#101010] pb-6 md:-pb-15 pt-12 md:pt-18.75 relative">
      <div className="absolute top-0 left-[35%] right-[35%] md:left-10 lg:left-[11.5%] xl:left-[8%] h-1 w-25.25 bg-[#d87d4a]" />
      <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:justify-between">
        <Link to="/">
          <img src={footerlogo} alt="" className="hidden md:inline-block" />
          <img src={footerLogoMobile} alt="" className="md:hidden" />
        </Link>
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6 lg:gap-[32.5px]">
          {footerLinks.map((link) => {
            return (
              <Link
                key={link.to}
                to={link.to}
                className="text-[13px] font-bold text-white tracking-[1px] hover:text-[#d87d4a] transition-colors"
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-6 md:mt-8 flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between ">
        <p className="text-center md:text-start font-medium text-[15px] leading-relaxed text-white/50 w-full lg:w-135">
          Audiophile is an all in one stop to fulfill your audio needs. We're a
          small team of music lovers and sound specialists who are devoted to
          helping you get the most out of personal audio. Come and visit our
          demo facility - we’re open 7 days a week.
        </p>
        <div className="items-center gap-4 hidden lg:flex">
          <ImFacebook2 className="text-white text-2xl cursor-pointer hover:text-[#d87d4a] transition-colors" />
          <FaTwitter className="text-white text-2xl cursor-pointer hover:text-[#d87d4a] transition-colors" />
          <FiInstagram className="text-white text-2xl cursor-pointer hover:text-[#d87d4a] transition-colors" />
        </div>
      </div>

      <div className="mt-10 md:mt-14 flex flex-col items-center gap-8 md:flex-row md:flex-row md:justify-between">
        <div className="items-center gap-4 lg:hidden flex">
          <ImFacebook2 className="text-white text-2xl cursor-pointer hover:text-[#d87d4a] transition-colors" />
          <FaTwitter className="text-white text-2xl cursor-pointer hover:text-[#d87d4a] transition-colors" />
          <FiInstagram className="text-white text-2xl cursor-pointer hover:text-[#d87d4a] transition-colors" />
        </div>
        <p className="font-medium text-sm text-white/50">
          Copyright {new Date().getFullYear()}. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
