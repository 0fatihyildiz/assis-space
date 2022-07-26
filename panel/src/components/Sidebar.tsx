import React, { useState } from "react";
import useMain from "../hooks/useMain";
import { useClickOutside } from "../hooks/use-click-outside";

import { AiOutlineFire, AiOutlineCalendar } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { ImPhoneHangUp } from "react-icons/im";
import { GrClose } from "react-icons/gr";
import { RiDashboardLine } from "react-icons/ri";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  BsFillEmojiHeartEyesFill,
  BsFillEmojiLaughingFill,
  BsFillEmojiSmileFill,
  BsFillEmojiSunglassesFill,
  BsFillEmojiWinkFill,
  BsEmojiExpressionlessFill,
  BsFillEmojiDizzyFill,
} from "react-icons/bs";
import { MdEmojiFoodBeverage } from "react-icons/md";
import "../style/sidebar.scss";

import Dropdown from "./Dropdown";

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen, isLogin } = useMain();

  const [activeBtn, setActiveBtn] = useState("calendar");

  const ref = useClickOutside(
    () => setSidebarOpen(false),
    ["mouseup", "touchend"]
  );
  const designModalClickOutsideRef = useClickOutside(
    () => setIsOpenDesignProjectMenu(false),
    ["mouseup", "touchend"]
  );const newTaskModalClickOutsideRef = useClickOutside(
    () => setIsOpenNewTaskMenu(false),
    ["mouseup", "touchend"]
  );

  const [isOpenDesignProjectMenu, setIsOpenDesignProjectMenu] = useState(false);
  const [isOpenNewTaskMenu, setIsOpenNewTaskMenu] = useState(false);

  return isLogin ? (
    <div
      className={
        "select-none bg-[#fafafa] sideBar border-l-[1px] border-base-gray p-6 shrink-0 w-full lg:w-96 h-full flex flex-col justify-between absolute xl:relative -right-full xl:right-0 z-20 top-0 " +
        (sidebarOpen ? "right-0" : "")
      }
      ref={ref}
    >
      <div className="flex flex-col">
        <div className="flex flex-row mb-8 justify-between items-center">
          <div className="w-full flex justify-between items-center">
            <div className="text-base-text text-lg font-bold">
              Today's Scheudle
            </div>

            <div className="btnArea bg-slate-100 rounded-full flex items-center justify-center px-2 py-1">
              <div
                onClick={() => setActiveBtn("dashboard")}
                className={`btn mr-1 cursor-pointer ${
                  activeBtn === "dashboard"
                    ? "text-gray-700"
                    : "text-gray-400 hover:text-gray-500"
                }`}
              >
                <RiDashboardLine />
              </div>
              <div
                onClick={() => setActiveBtn("calendar")}
                className={`btn ml-1 cursor-pointer ${
                  activeBtn === "calendar"
                    ? "text-gray-700"
                    : "text-gray-400 hover:text-gray-500"
                }`}
              >
                <AiOutlineCalendar />
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
            <GrClose />
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
            <BsPlusLg className="mr-2" />
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
            <ImPhoneHangUp className="hover:text-gray-300 w-6 h-6 cursor-pointer transition-all duration-2" />
            <BiDotsVerticalRounded className="hover:text-gray-300 ml-2 w-6 h-6 cursor-pointer transition-all duration-2" />
          </div>
        </div>

        <hr className="my-2" />

        <div className="mt-6 flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <div className="text-base-text font-bold mb-1">Design Project</div>
            <div className="text-gray-400 text-xs font-semibold flex flex-row items-center">
              <AiOutlineFire className="w-4 h-4 mr-1" /> In Progress
            </div>
          </div>

          <div ref={designModalClickOutsideRef} className="relative">
            <div onClick={() => setIsOpenDesignProjectMenu(value => !value)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-all duration-2">
              <BiDotsVerticalRounded className="w-5 h-5 cursor-pointer" />
            </div>
            {
              isOpenDesignProjectMenu &&
              <Dropdown closeDropdown={() => setIsOpenDesignProjectMenu(false)}>
                <div className="px-4 py-2 text-xs font-semibold hover:bg-gray-200 transition-all duration-2 cursor-pointer">Option 1</div>
                <div className="px-4 py-2 text-xs font-semibold hover:bg-gray-200 transition-all duration-2 cursor-pointer">Option 2</div>
              </Dropdown>
            }
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
          <div className="subtitle text-base-text font-bold"> New Task </div>
          <div className="relative" ref={newTaskModalClickOutsideRef}>
            <div onClick={() => setIsOpenNewTaskMenu(value => !value)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-200 cursor-pointer transition-all duration-2">
              <BiDotsVerticalRounded className="w-6 h-6" />
            </div>
            {
              isOpenNewTaskMenu &&
              <Dropdown closeDropdown={() => setIsOpenNewTaskMenu(false)}>
                <div className="px-4 py-2 text-xs font-semibold hover:bg-gray-200 transition-all duration-2 cursor-pointer">Option 1</div>
                <div className="px-4 py-2 text-xs font-semibold hover:bg-gray-200 transition-all duration-2 cursor-pointer">Option 2</div>
                <div className="px-4 py-2 text-xs font-semibold hover:bg-gray-200 transition-all duration-2 cursor-pointer">Option 3</div>
              </Dropdown>
            }
          </div>
        </div>

        <div className="text-gray-400 text-xs font-semibold mb-2">
          Task Title
        </div>
        <input
          className="bg-[#f5f6f8] rounded-lg text-base-text text-sm font-semibold w-full p-3"
          type="text"
        />

        <div className="emojis flex flex-row justify-around mt-4">
          <FaChevronLeft className="control w-5 h-5" />
          <div className="emoji">
            <BsFillEmojiHeartEyesFill className="w-5 h-5" />
          </div>
          <div className="emoji">
            <BsFillEmojiLaughingFill className="w-5 h-5" />
          </div>
          <div className="emoji">
            <BsFillEmojiSmileFill className="w-5 h-5" />
          </div>
          <div className="emoji">
            <BsFillEmojiSunglassesFill className="w-5 h-5" />
          </div>
          <div className="emoji">
            <BsFillEmojiWinkFill className="w-5 h-5" />
          </div>
          <div className="emoji">
            <BsEmojiExpressionlessFill className="w-5 h-5" />
          </div>
          <div className="emoji">
            <BsFillEmojiDizzyFill className="w-5 h-5" />
          </div>
          <div className="emoji">
            <MdEmojiFoodBeverage className="w-5 h-5" />
          </div>
          <FaChevronRight className="control w-5 h-5" />
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
              <GrClose className="w-3 h-3" style={{ color: "#7e5ce4" }} />
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
              <GrClose className="w-3 h-3" style={{ color: "#48c1a0" }} />
            </div>

            <div className="bg-[#f5f6f8] hover:bg-gray-200 w-8 h-8 rounded-full flex justify-center items-center cursor-pointer">
              <BsPlusLg className="w-3 h-3" />
            </div>
          </div>

          <div className="transition-all duration-2 bg-base-color hover:bg-base-dark w-8 h-8 text-gray-50 rounded-full flex items-center justify-center cursor-pointer">
            <FaChevronRight />
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
