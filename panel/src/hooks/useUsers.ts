import { useContext } from "react";
import { UsersContext } from "../context/users";

export default function useUsers() {
  const context = useContext(UsersContext);

  if (context === undefined) {
    throw new Error("useTasks must be used within a StoreProvider!");
  }

  return context;
}
