import React, { FC } from "react";
import { TiTick } from "react-icons/ti";

const Tasks: FC<{
  tasks: Record<
    any,
    {
      logo: string;
      title: string;
      description: string;
      completed?: boolean;
    }[]
  >;
}> = function (props) {
  let days = Object.keys(props.tasks);
  let tasksList = [];

  for (let i = 0; i < days.length; i++) {
    tasksList.push({
      title: days[i],
      tasks: props.tasks[days[i]],
    });
  }

  return (
    <div className="tasks">
      {tasksList.map((item, i) => (
        <div key={"tasksHeaderID-" + i}>
          <div className="text-gray-400 font-semibold my-5">
            {item.title.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
              return g1.toUpperCase() + g2.toLowerCase();
            })}
          </div>
          {
            // @ts-ignore
            item.tasks.map((task, i) => (
              <div
                key={"task-" + i}
                className="task p-3 my-3 flex flex-row hover:bg-gray-50 rounded-lg overflow-hidden cursor-pointer"
              >
                <div className="flex flex-row w-full items-center">
                  <div className="relative shrink-0">
                    <img
                      alt="Task"
                      className="w-12 h-12 mr-4 rounded-lg"
                      src={task.logo}
                    />
                    { task.completed &&
                      <div
                        className="absolute -top-1.5 right-1.5 bg-white rounded-full text-[#06d7a0] p-1"
                      >
                        <TiTick />
                      </div>
                    }
                  </div>
                  <div className="taskContent">
                    <div className="text-gray-600 font-semibold"> {task.title} </div>
                    <div className="text-gray-400 text-xs font-semibold white-space-nowrap overflow-hidden text-ellipsis"> {task.description} </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      ))}
    </div>
  );
};

export default Tasks;
