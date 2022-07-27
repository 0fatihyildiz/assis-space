import React, { FC } from "react";
import { TiTick } from "react-icons/ti";

const Snapshots: FC<{
  snapshots: Record<
    any,
    {
      logo: string;
      title: string;
      description: string;
      completed?: boolean;
    }[]
  >;
}> = function (props) {
  let days = Object.keys(props.snapshots);
  let snapshotsList = [];

  for (let i = 0; i < days.length; i++) {
    snapshotsList.push({
      title: days[i],
      snapshots: props.snapshots[days[i]],
    });
  }

  return (
    <div className="snapshots">
      {snapshotsList.map((item, i) => (
        <div key={"snapshotsHeaderID-" + i}>
          <div className="text-gray-400 font-semibold my-5 capitalize">
            {item.title}
          </div>
          {item.snapshots.map((snapshot, i) => (
            <div
              key={"snapshot-" + i}
              className="snapshot p-3 my-3 flex flex-row hover:bg-gray-50 rounded-lg overflow-hidden cursor-pointer"
            >
              <div className="flex flex-row w-full items-center">
                <div className="relative shrink-0">
                  <img
                    alt="Snapshot"
                    className="w-12 h-12 mr-4 rounded-lg"
                    src={snapshot.logo}
                  />
                  {snapshot.completed && (
                    <div className="absolute -top-1.5 right-1.5 bg-white rounded-full text-[#06d7a0] p-1">
                      <TiTick />
                    </div>
                  )}
                </div>
                <div className="snapshotContent">
                  <div className="text-gray-600 font-semibold">
                    {snapshot.title}
                  </div>
                  <div className="text-gray-400 text-xs font-semibold white-space-nowrap overflow-hidden text-ellipsis">
                    {snapshot.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Snapshots;
