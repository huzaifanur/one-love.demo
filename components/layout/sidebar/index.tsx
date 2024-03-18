"use client";
import { tabs } from "@/constants/sidebar";
import Link from "next/link";
import React from "react";

const Sidebar = ({ hash, setHash }: any) => {
  return (
    <div key={Math.random()} className="w-64 bg-navyblue h-screen">
      <ul className="pt-10 text-white uppercase">
        {tabs.map((tab) => (
          <Link
            scroll={false}
            key={tab?.tabName}
            className={`${
              hash === tab?.href && "bg-[#364a6b]"
            } p-2 hover:bg-[#5477af] block h-full w-full`}
            href={`#${tab?.href}`}
            onClick={() => {
              setHash(tab?.href);
            }}
          >
            {tab?.tabName}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
