import React from "react";
import useMain from "@hooks/useMain";
import { GrClose } from "react-icons/gr";

export default function Account() {
  const { setIsLogin, userInfos, setUserInfos, navbarOpen, setNavbarOpen } = useMain();

  const logout = function() {
    setUserInfos({
      avatar: "https://cdn.discordapp.com/attachments/584738120738537483/990766575965597746/Group_2_2.png",
      username: 'Guest',
      role: 'unkown',
    });
    setIsLogin(false);
  }

  return (
    <div className="flex flex-row items-center justify-between p-6">
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex">
          <img className="avatar w-14 rounded-full border-2 border-solid border-base-light mr-6" src={userInfos.avatar} alt="" />

          <div className="flex flex-col justify-center">
            <div className="text-slate-700 font-bold"> {userInfos.username} </div>
            <div className="text-slate-600 text-xs font-semibold"> {userInfos.role} </div>
          </div>
        </div>

        <div onClick={() => logout()} className="text-gray-500 hover:text-base-color cursor-pointer transition-all duration-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>
      </div>

      <div
        className={
          "w-10 h-10 flex items-center justify-center lg:hidden top-6 right-6 text-slate-700 hover:bg-gray-200 rounded-lg cursor-pointer ml-2 " + (navbarOpen ? "flex" : "")
        }
        onClick={() => {
          setNavbarOpen(false);
        }}
      >
        <GrClose />
      </div>
    </div>
  );
}
