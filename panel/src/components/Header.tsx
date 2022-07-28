import React from "react";
import useMain from "@hooks/useMain";

export default function Header() {
  const { navbarOpen, setNavbarOpen, sidebarOpen, setSidebarOpen, isLogin } =
    useMain();

  return isLogin ? (
    <div className="header bg-flour-white fixed top-0 left-0 w-full h-16 border-b-[1px] border-base-gray xl:hidden flex justify-between items-center p-6 z-10">
      <div className="hidden lg:block"></div>
      <div
        className="transition-all duration-200 text-slate-700 w-10 h-10 hover:bg-gray-200 flex items-center justify-center rounded-lg lg:hidden cursor-pointer"
        onClick={() => {
          setNavbarOpen(!navbarOpen);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
        </svg>
      </div>

      <div
        className="transition-all duration-200 text-slate-700 w-10 h-10 hover:bg-gray-200 flex items-center justify-center rounded-lg xl:hidden cursor-pointer"
        onClick={() => {
          setSidebarOpen(!sidebarOpen);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    </div>
  ) : null;
}
