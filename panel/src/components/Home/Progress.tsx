import React from "react";
import useTasks from "../../hooks/useTasks";

export default function Progress() {
  const { completedPercent } = useTasks();

  return (
    <div className="text-gray-400 text-xs font-extrabold w-full sm:w-auto flex flex-row items-center justify-end">
      <div> {completedPercent}% task completed </div>
      <div className="w-[100px] h-2 bg-gray-300 rounded-lg overflow-hidden ml-2 sm:ml-4">
        <div
          className="h-2 bg-base-color rounded-lg"
          style={{ width: `${completedPercent}%` }}
        ></div>
      </div>
    </div>
  );
}
