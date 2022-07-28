import React from "react";
import useNavigation from "@hooks/useNavigation";

export default function Favorites() {
  const { favorites } = useNavigation();

  const favoriteItems = favorites.slice(favorites.length - 3, favorites.length);

  return (
    <div className="flex flex-col items-start">
      <div className="text-slate-700 text-xs font-semibold mb-1 mt-2 mx-6"> Favorites </div>

      {favoriteItems.map((item: any, i: number) => (
        <div
          key={"favorites-" + i}
          className="favoriteItem w-full text-[13px] text-zinc-400 font-semibold hover:bg-gray-100 py-3 px-6 flex flex-row items-center cursor-pointer"
        >
          <div className="flex justify-center items-center">
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill={item.color} d ="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
          </svg>
          </div>
          <div className="navText ml-4"> {item.title} </div>
        </div>
      ))}

      <div className="addFavorites w-auto p-2 text-gray-50 bg-base-color hover:bg-base-dark my-3 mx-6 rounded-full flex items-center justify-center cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
    </div>
  );
}
