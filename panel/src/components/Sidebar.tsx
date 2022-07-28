import "@assets/css/sidebar.scss";
import React, { useState } from "react";

import useMain from "@hooks/useMain";
import { useClickOutside } from "@hooks/use-click-outside";

import Dropdown from "./Dropdown";

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen, isLogin } = useMain();

  const [activeBtn, setActiveBtn] = useState("calendar");

  const pageRef = useClickOutside(
    () => setSidebarOpen(false),
    ["mouseup", "touchend"]
  );
  const designModalClickOutsideRef = useClickOutside(
    () => setIsOpenDesignProjectMenu(false),
    ["mouseup", "touchend"]
  );
  const newSnapshotModalClickOutsideRef = useClickOutside(
    () => setIsOpenNewSnapshotMenu(false),
    ["mouseup", "touchend"]
  );

  const [isOpenDesignProjectMenu, setIsOpenDesignProjectMenu] = useState(false);
  const [isOpenNewSnapshotMenu, setIsOpenNewSnapshotMenu] = useState(false);

  return isLogin ? (
    <div
      className={
        "select-none bg-flour-white sideBar border-l-[1px] border-base-gray p-6 shrink-0 w-full lg:w-96 h-full flex flex-col justify-between absolute xl:relative -right-full xl:right-0 z-20 top-0 " +
        (sidebarOpen ? "right-0" : "")
      }
      ref={pageRef}
    >
      <div className="flex flex-col">
        <div className="flex flex-row mb-8 justify-between items-center">
          <div className="w-full flex justify-between items-center">
            <div className="text-base-text text-lg font-bold">
              Bügünün Özeti
            </div>

            <div className="btnArea bg-slate-100 rounded-full flex items-center justify-center px-2 py-1">
              <div
                onClick={() => setActiveBtn("calendar")}
                className={`btn cursor-pointer ${
                  activeBtn === "calendar"
                    ? "text-gray-700"
                    : "text-gray-400 hover:text-gray-500"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div
            className={
              "sidebarClose ml-2 w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-lg xl:hidden top-6 right-6 cursor-pointer " +
              (sidebarOpen ? "flex" : "")
            }
            onClick={() => {
              setSidebarOpen(false);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <div>
            <div className="text-[#f1879e] text-xs font-semibold">
              30 minute call with Client
            </div>
            <div className="text-base-text font-bold">
              Project Discovery Call
            </div>
          </div>

          <div className="transition-all duration-2 text-[#378dfd] hover:bg-[#f0f4fa] text-sm font-semibold rounded-lg px-4 flex flex-row items-center cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Invite
          </div>
        </div>

        <div className="call bg-[#06d7a0] rounded-lg text-gray-50 my-8 flex flex-row justify-between items-center p-6">
          <div className="avatars flex flex-row">
            <div className="-mr-3">
              <img
                className="rounded-full w-7 h-7"
                src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                alt=""
              />
            </div>
            <div className="-mr-3">
              <img
                className="rounded-full w-7 h-7"
                src="https://e7.pngegg.com/pngimages/236/917/png-clipart-computer-icons-avatar-woman-user-profile-avatar-face-heroes-thumbnail.png"
                alt=""
              />
            </div>
            <div className="-mr-3">
              <img
                className="rounded-full w-7 h-7"
                src="https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child-thumbnail.png"
                alt=""
              />
            </div>
            <div className="-mr-3">
              <img
                className="rounded-full w-7 h-7"
                src="https://e7.pngegg.com/pngimages/980/886/png-clipart-male-portrait-avatar-computer-icons-icon-design-avatar-flat-face-icon-people-head-thumbnail.png"
                alt=""
              />
            </div>
          </div>
          <div className="text-sm font-semibold"> 28:31 </div>
          <div className="flex flex-row">
            <svg xmlns="http://www.w3.org/2000/svg" className="hover:text-gray-300 w-6 h-6 cursor-pointer transition-all duration-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="hover:text-gray-300 ml-2 w-6 h-6 cursor-pointer transition-all duration-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </div>
        </div>

        <hr className="my-2" />

        <div className="mt-6 flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <div className="text-base-text font-bold mb-1">Design Project</div>
            <div className="text-gray-400 text-xs font-semibold flex flex-row items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg> In Progress
            </div>
          </div>

          <div ref={designModalClickOutsideRef} className="relative">
            <div
              onClick={() => setIsOpenDesignProjectMenu((value) => !value)}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-all duration-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </div>
            {isOpenDesignProjectMenu && (
              <Dropdown closeDropdown={() => setIsOpenDesignProjectMenu(false)}>
                <div className="px-4 py-2 text-xs font-semibold hover:bg-gray-200 transition-all duration-2 cursor-pointer">
                  Option 1
                </div>
                <div className="px-4 py-2 text-xs font-semibold hover:bg-gray-200 transition-all duration-2 cursor-pointer">
                  Option 2
                </div>
              </Dropdown>
            )}
          </div>
        </div>

        <div className="flex flex-row mt-6">
          <div className="basis-1/3">
            <div className="text-gray-400 text-xs font-semibold">Completed</div>
            <div className="text-base-text text-2xl font-extrabold tracking-[-2px]">
              114
            </div>
          </div>
          <div className="basis-1/3">
            <div className="text-gray-400 text-xs font-semibold">
              In Progress
            </div>
            <div className="text-base-text text-2xl font-extrabold tracking-[-2px]">
              114
            </div>
          </div>
          <div className="basis-1/3">
            <div className="text-gray-400 text-xs font-semibold">
              Team Members
            </div>
            <div className="avatars flex flex-row mt-2">
              <div className="-mr-3">
                <img
                  className="rounded-full w-6 h-6"
                  src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                  alt=""
                />
              </div>
              <div className="-mr-3">
                <img
                  className="rounded-full w-6 h-6"
                  src="https://e7.pngegg.com/pngimages/236/917/png-clipart-computer-icons-avatar-woman-user-profile-avatar-face-heroes-thumbnail.png"
                  alt=""
                />
              </div>
              <div className="-mr-3">
                <img
                  className="rounded-full w-6 h-6"
                  src="https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child-thumbnail.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-6 flex flex-row items-center justify-between">
          <div className="subtitle text-base-text font-bold">
            {" "}
            New Snapshot{" "}
          </div>
          <div className="relative" ref={newSnapshotModalClickOutsideRef}>
            <div
              onClick={() => setIsOpenNewSnapshotMenu((value) => !value)}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-200 cursor-pointer transition-all duration-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </div>
            {isOpenNewSnapshotMenu && (
              <Dropdown closeDropdown={() => setIsOpenNewSnapshotMenu(false)}>
                <div className="px-4 py-2 text-xs font-semibold hover:bg-gray-200 transition-all duration-2 cursor-pointer">
                  Option 1
                </div>
                <div className="px-4 py-2 text-xs font-semibold hover:bg-gray-200 transition-all duration-2 cursor-pointer">
                  Option 2
                </div>
                <div className="px-4 py-2 text-xs font-semibold hover:bg-gray-200 transition-all duration-2 cursor-pointer">
                  Option 3
                </div>
              </Dropdown>
            )}
          </div>
        </div>

        <div className="text-gray-400 text-xs font-semibold mb-2">
          Snapshot Title
        </div>
        <input
          className="bg-[#f5f6f8] rounded-lg text-base-text text-sm font-semibold w-full p-3"
          type="text"
        />

        <div className="emojis flex flex-row justify-around items-center mt-4">
          <div className="w-8 h-8 hover:bg-gray-200 flex items-center justify-center rounded-full cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-color" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div className="text-gray-500 hover:text-gray-600 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-gray-500 hover:text-gray-600 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-gray-500 hover:text-gray-600 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-gray-500 hover:text-gray-600 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-gray-500 hover:text-gray-600 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-gray-500 hover:text-gray-600 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-gray-500 hover:text-gray-600 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-gray-500 hover:text-gray-600 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="w-8 h-8 hover:bg-gray-200 flex items-center justify-center rounded-full cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-base-color" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <hr className="my-6" />

        <div className="text-gray-400 font-semibold text-xs mb-4">
          Add Collaborators
        </div>

        <div className="flex flex-row justify-between">
          <div className="flex">
            <div
              className="collabrator flex items-center mr-4 py-1 pl-1 pr-2 rounded-full"
              style={{ background: "#efebfc" }}
            >
              <img
                className="w-6 h-6 rounded-full"
                src="https://st2.depositphotos.com/2703645/5669/v/950/depositphotos_56695433-stock-illustration-female-avatar.jpg"
                alt=""
              />
              <span
                className="text-xs font-semibold mx-2"
                style={{ color: "#7e5ce4" }}
              >
                Angela
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ color: "#7e5ce4" }} className="h-3 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div
              className="collabrator flex items-center mr-4 p-1 rounded-full"
              style={{ background: "#e6fbf6" }}
            >
              <img
                className="w-6 h-6 rounded-full"
                src="https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59095529-stock-illustration-profile-icon-male-avatar.jpg"
                alt=""
              />
              <span
                className="text-xs font-semibold mx-2"
                style={{ color: "#48c1a0" }}
              >
                Chris
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ color: "#48c1a0" }} className="h-3 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            <div className="bg-[#f5f6f8] hover:bg-gray-200 w-8 h-8 rounded-full flex justify-center items-center cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </div>

          <div className="transition-all duration-2 bg-base-color hover:bg-base-dark w-8 h-8 text-gray-50 rounded-full flex items-center justify-center cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
