import { useContext } from "react";
import { SnapshotsContext } from "@context/snapshots";

export default function useSnapshots() {
  const context = useContext(SnapshotsContext);

  if (context === undefined) {
    throw new Error("useSnapshots must be used within a StoreProvider!");
  }

  return context;
}
