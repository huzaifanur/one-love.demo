import { navBarLink } from "@/constants/navbar";
import Link from "next/link";
import React from "react";
import ProfileButton from "./ProfileButton";
import logo from "@/assets/images/logo-nobackground-140.png";
import "./styles.css";
import Image from "next/image";
import Section from "@/components/shared/Section";
const Navbar = () => {
  return (
    <div className="bg-blue fixed top-0 w-full text-white flex justify-around items-center p-4 z-50">
      {/* logo */}
      <div>
        <Image src={logo} alt="logo" width={75} height={75} />
      </div>
      {/* tabs */}
      <div className="">
        {navBarLink.map((link) => (
          <Link key={link?.name} href={link?.url} className="page-links mx-2">
            {link?.name}
          </Link>
        ))}
      </div>
      {/* user icon */}
      <div>
        <ProfileButton />
      </div>
    </div>
  );
};

export default Navbar;
