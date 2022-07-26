import React from "react";
import useMain from "../hooks/useMain";
import { HiMenuAlt4 } from "react-icons/hi";
import { BiCalendarAlt } from "react-icons/bi";

export default function Header() {
  const { navbarOpen, setNavbarOpen, sidebarOpen, setSidebarOpen, isLogin } = useMain();

  return isLogin ? (
    <div className="header bg-[#fafafa] fixed top-0 left-0 w-full h-16 border-b-[1px] border-base-gray xl:hidden flex justify-between items-center p-6 z-10">
      <div className="hidden lg:block"></div>
      <div
        className="transition-all duration-200 text-slate-700 w-10 h-10 hover:bg-gray-200 flex items-center justify-center rounded-lg lg:hidden cursor-pointer"
        onClick={() => {
          setNavbarOpen(!navbarOpen);
        }}
      >
        <HiMenuAlt4 className="w-5 h-5" />
      </div>

      <div
        className="transition-all duration-200 text-slate-700 w-10 h-10 hover:bg-gray-200 flex items-center justify-center rounded-lg xl:hidden cursor-pointer"
        onClick={() => {
          setSidebarOpen(!sidebarOpen);
          console.log(sidebarOpen);
          
        }}
      >
        <BiCalendarAlt className="w-5 h-5" />
      </div>
    </div>
  ) : null;
}
