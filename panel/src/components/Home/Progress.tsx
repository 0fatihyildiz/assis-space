import React from "react";
import useSnapshots from "@hooks/useSnapshots";

export default function Progress() {
  const { completedPercent } = useSnapshots();

  return (
    <div className="text-gray-400 text-xs font-extrabold w-full sm:w-auto flex flex-row items-center justify-end">
      <div> Görevlerin %{completedPercent}'si tamamlandı </div>
      <div className="w-[100px] h-2 bg-gray-300 rounded-lg overflow-hidden ml-2 sm:ml-4">
        <div
          className="h-2 bg-base-color rounded-lg"
          style={{ width: `${completedPercent}%`, minWidth: "1%" }}
        ></div>
      </div>
    </div>
  );
}
