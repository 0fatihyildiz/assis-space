import React, { FC } from "react";
import { HiLightBulb } from "react-icons/hi";
import { FaKey } from "react-icons/fa";

export const icons = {
  lightBulb: HiLightBulb,
  key: FaKey,
};

interface Props {
  width: 1 | 2;
  background: string;
  icon: string;
  title: string;
}

const Cards: FC<Props> = function(props) {
  const { width, background, icon, title } = props;
  const IconComponent = icons[icon as keyof typeof icons];

  return (
    <div
      className={
        "bg-base-color rounded-lg text-gray-50 p-8 shrink-0 mr-4 h-48 flex flex-col justify-between items-start " +
        (width === 1 ? "w-72" : "w-96")
      }
      style={{ background: background }}
    >
      <div className="bg-[#13131377] rounded-lg p-3">
        <IconComponent className="w-5 h-5" />
      </div>

      <div className="md:text-base font-semibold"> {title} </div>
    </div>
  );
};

export default Cards;
