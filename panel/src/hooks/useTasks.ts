import { useContext } from "react";
import { TasksContext } from "../context/tasks";

export default function useTasks() {
  const context = useContext(TasksContext);

  if (context === undefined) {
    throw new Error("useTasks must be used within a StoreProvider!");
  }

  return context;
}
