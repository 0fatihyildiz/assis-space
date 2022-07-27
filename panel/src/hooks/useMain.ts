import { useContext } from "react";
import { MainContext } from "@context/main";

export default function useMain() {
  const context = useContext(MainContext);

  if (context === undefined) {
    throw new Error("useMain must be used within a StoreProvider!");
  }

  return context;
}
