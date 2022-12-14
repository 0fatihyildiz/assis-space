import { useContext } from "react";
import { LessonsContext } from "@context/lessons";

export default function useLessons() {
  const context = useContext(LessonsContext);

  if (context === undefined) {
    throw new Error("useSnapshots must be used within a StoreProvider!");
  }

  return context;
}
