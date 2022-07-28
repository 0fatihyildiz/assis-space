import React, { FC } from "react";

export const icons = {
  lightBulb: () => 
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>,
  key: () =>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>,
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
        <IconComponent />
      </div>

      <div className="md:text-base font-semibold"> {title} </div>
    </div>
  );
};

export default Cards;
