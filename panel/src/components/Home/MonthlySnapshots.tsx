import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

import Snapshots from "./Snapshots";
import useSnapshots from "@hooks/useSnapshots";

const MonthlySnapshot = function () {
  const { snapshots } = useSnapshots();
  const [activeTab, setActiveTab] =
    useState<keyof typeof snapshots>("activeSnapshots");

  return (
    <div className="monthlySnapshots flex flex-col mt-6">
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="text-base-text text-lg font-extrabold w-full sm:w-auto mb-2 sm:mb-0">
          Aylık İzlenimler
        </div>
      </div>

      <div className="tabs border-b-2 border-base-gray flex flex-col sm:flex-row-reverse justify-between items-stretch">
        <div className="text-gray-400 w-full sm:w-auto m-2 flex flex-row items-center">
          <BiSearch className="w-5 h-5 text-gray-400 mr-1" />
          <input
            className="w-full text-sm sm:w-24 pl-1 p-2"
            type="text"
            placeholder="Ara"
          />
        </div>

        <div className="flex flex-row">
          <div
            onClick={() => {
              setActiveTab("activeSnapshots");
            }}
            className={
              "tab relative text-sm font-semibold text-center text-gray-400 hover:text-gray-500 cursor-pointer flex items-center px-5 py-2 " +
              (activeTab === "activeSnapshots"
                ? "active text-second-theme"
                : null)
            }
          >
            Aktif Kullanıcılar
          </div>
          <div
            onClick={() => {
              setActiveTab("lastCompletedLessons");
            }}
            className={
              "tab relative text-sm font-semibold text-center text-gray-400 hover:text-gray-500 cursor-pointer flex items-center px-5 py-2 " +
              (activeTab === "lastCompletedLessons"
                ? "active text-second-theme"
                : null)
            }
          >
            En Son Tamamlanan Dersler
          </div>
        </div>
      </div>

      <Snapshots snapshots={snapshots[activeTab]} />
    </div>
  );
};

export default MonthlySnapshot;
