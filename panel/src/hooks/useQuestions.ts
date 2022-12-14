import { useContext } from "react";
import { QuestionsContext } from "@context/questions";

export default function useQuestions() {
  const context = useContext(QuestionsContext);

  if (context === undefined) {
    throw new Error("useSnapshots must be used within a StoreProvider!");
  }

  return context;
}
