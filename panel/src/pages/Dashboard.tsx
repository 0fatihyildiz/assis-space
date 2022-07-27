import "@assets/css/pages/dashboard.scss";
import React from "react";

import useMain from "@hooks/useMain";
import Card from "@components/Home/Card";
import Progress from "@components/Home/Progress";
import MonthlySnapshots from "@components/Home/MonthlySnapshots";

export default function Dashboard() {
  const { userInfos, homeCards } = useMain();

  return (
    <div className="page flex-1 max-h-screen overflow-auto pb-6 px-6 lg:px-12 pt-20 mt-2 xl:pt-6 xl:mt-0">
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-between">
        <div className="text-base-text text-lg font-extrabold w-full sm:w-auto text-left mb-2 sm:mb-0">
          Merhaba {userInfos.username}!
        </div>
        <Progress />
      </div>

      <div className="cards pb-2 flex flex-row flex-nowrap overflow-auto">
        {homeCards.map((card, i) => (
          <Card key={"homeCard-" + i} {...card} />
        ))}
      </div>

      <MonthlySnapshots />
    </div>
  );
}
