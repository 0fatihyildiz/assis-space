import React, { useState } from "react";
import useTasks from "../../hooks/useTasks";
import { BsPlusLg } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";

import Tasks from "./Tasks";

export default function MonthlyTasks() {
  const { tasks } = useTasks();

  const [activeTab, setActiveTab] = useState<keyof typeof tasks>("activeTasks");

  return (
    <div className="monthlyTasks flex flex-col mt-6">
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="text-base-text text-lg font-extrabold w-full sm:w-auto mb-2 sm:mb-0"> Monthly Tasks </div>
        <div className="w-full sm:w-auto flex flex-row items-center justify-end">
          <div className="actionBtn rounded-lg text-xs font-semibold bg-gray-100 mr-4 p-2 px-4 cursor-pointer select-none">Archive</div>
          <div className="actionBtn rounded-lg text-xs font-semibold bg-second-theme text-gray-50 p-2 px-4 flex flex-row items-center cursor-pointer select-none">
            <BsPlusLg className="w-3 h-3  mr-1" />
            New
          </div>
        </div>
      </div>

      <div className="tabs border-b-2 border-base-gray flex flex-col sm:flex-row-reverse justify-between items-stretch">
        <div className="text-gray-400 w-full sm:w-auto m-2 flex flex-row items-center">
          <BiSearch className="w-5 h-5 text-gray-400 mr-1" />
          <input className="w-full text-sm sm:w-24 pl-1 p-2" type="text" placeholder="Search" />
        </div>

        <div className="flex flex-row">
          <div
            onClick={() => {
              setActiveTab("activeTasks");
            }}
            className={
              "tab relative text-sm font-semibold text-center text-gray-400 hover:text-gray-500 cursor-pointer flex items-center px-5 py-2 " +
              (activeTab === "activeTasks" ? "active text-second-theme" : null)
            }
          >
            {" "}
            Active Tasks{" "}
          </div>
          <div
            onClick={() => {
              setActiveTab("completedTasks");
            }}
            className={
              "tab relative text-sm font-semibold text-center text-gray-400 hover:text-gray-500 cursor-pointer flex items-center px-5 py-2 " +
              (activeTab === "completedTasks" ? "active text-second-theme" : null)
            }
          >
            {" "}
            Completed{" "}
          </div>
        </div>
      </div>

      <Tasks tasks={tasks[activeTab]} />
    </div>
  );
}
