import React from "react";
import useMain from "../hooks/useMain";
import "../style/navbar.scss";

import Account from "./Navbar/Account";
import Menu from "./Navbar/Menu";
import Favorites from "./Navbar/Favorites";

export default function Navbar() {
  const { navbarOpen, isLogin } = useMain();

  return isLogin ? (
    <div
      className={
        "navbar bg-[#fafafa] shrink-0 w-full lg:w-72 h-full border-r-[1px] border-base-gray flex flex-col justify-between overflow-auto select-none absolute lg:relative lg:left-0 z-20 top-0 " +
        (navbarOpen ? "left-0" : "-left-full")
      }
    >
      <div className="flex flex-col">
        <Account />
        <Menu />
      </div>

      <div className="py-6 pt-0">
        <Favorites />
        <a
          className="licenseLink text-zinc-400 hover:text-zinc-500 text-[10px] font-semibold mt-1 mx-6"
          target="_blank"
          rel="noreferrer"
          href="https://www.youtube.com/watch?v=wW9PobBAZOE"
        >
          2021 Ahmet Eker License
        </a>
      </div>
    </div>
  ) : null;
}
