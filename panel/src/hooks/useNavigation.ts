import { useContext } from "react";
import { NavigationContext } from "../context/navigation";

export default function useNavigation() {
  const context = useContext(NavigationContext);

  if (context === undefined) {
    throw new Error("useNavigation must be used within a StoreProvider!");
  }

  return context;
}
