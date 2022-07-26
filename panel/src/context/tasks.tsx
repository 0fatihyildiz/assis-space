import { createContext, FC, ReactNode, useMemo, useState } from "react";

type TasksContextType = {
  tasks: {
    activeTasks: {
      [key: string]: {
        logo: string,
        title: string,
        description: string
      }[]
    },
    completedTasks: {
      [key: string]: {
        logo: string,
        title: string,
        description: string
      }[]
    }
  };
  completedPercent: number;
};

export const TasksContext = createContext<TasksContextType>({
  tasks: {
    activeTasks: {
      today: [
        {
          logo: "https://seeklogo.com/images/U/uber-drive-logo-993E1C334C-seeklogo.com.png",
          title: "Uber",
          description:
            "App Design and Upgrades with new features - In Progress 16 days",
        },
        {
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Facebook_logo_36x36.svg/2048px-Facebook_logo_36x36.svg.png",
          title: "Facebook",
          description:
            "Facebook Ads Design for CreativeCloud - Last worked 5 days ago",
        },
        {
          logo: "https://www.fintechfutures.com/files/2016/03/payoneer.png",
          title: "Payooner",
          description: "Payoneer Dashboard Design - Due in 3 days ago",
        },
      ],
      tomorrow: [
        {
          logo: "https://blog.coolever.life/wp-content/uploads/2020/04/upwork-logo.png",
          title: "Upwork",
          description: "Developming - Viewed Just Now - Assigned 10 min ago",
        },
      ],
    },
    completedTasks: {
      "Long time ago": [
        {
          logo: "https://yt3.ggpht.com/Oo_iYn0lPlo2HF-WvCMcN4D3j8abIE7C55egplFR5wIaGvP9DYx1iFngaQke7GLJigkRKq1VjhU=s900-c-k-c0x00ffffff-no-rj",
          title: "Rape The Şevki",
          description: "love like a friend fuck like an enemy"
        },
      ],
    },
  },
  completedPercent: 0,
});

type TasksProviderProps = {
  children: ReactNode;
};

export const TasksProvider: FC<TasksProviderProps> = (props) => {
  const { children } = props;

  const [tasks] = useState({
    activeTasks: {
      today: [
        {
          logo: "https://seeklogo.com/images/U/uber-drive-logo-993E1C334C-seeklogo.com.png",
          title: "Uber",
          description:
            "App Design and Upgrades with new features - In Progress 16 days",
        },
        {
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Facebook_logo_36x36.svg/2048px-Facebook_logo_36x36.svg.png",
          title: "Facebook",
          description:
            "Facebook Ads Design for CreativeCloud - Last worked 5 days ago",
        },
        {
          logo: "https://www.fintechfutures.com/files/2016/03/payoneer.png",
          title: "Payooner",
          description: "Payoneer Dashboard Design - Due in 3 days ago",
        },
      ],
      tomorrow: [
        {
          logo: "https://blog.coolever.life/wp-content/uploads/2020/04/upwork-logo.png",
          title: "Upwork",
          description: "Developming - Viewed Just Now - Assigned 10 min ago",
        },
      ],
    },
    completedTasks: {
      "Long time ago": [
        {
          logo: "https://yt3.ggpht.com/Oo_iYn0lPlo2HF-WvCMcN4D3j8abIE7C55egplFR5wIaGvP9DYx1iFngaQke7GLJigkRKq1VjhU=s900-c-k-c0x00ffffff-no-rj",
          title: "Rape The Şevki",
          description: "love like a friend fuck like an enemy",
          completed: true,
        }
      ],
    },
  });

  let tasksLength: number = 0;
  let completedLength: number = 0;

  let activeTasksKeys = Object.keys(tasks.activeTasks);
  let completedTasksKeys = Object.keys(tasks.completedTasks);

  activeTasksKeys.forEach((key) => { 
    // @ts-ignore
    tasksLength += tasks.activeTasks[key].length
  });

  completedTasksKeys.forEach((key) => {
    // @ts-ignore
    completedLength += tasks.completedTasks[key].length
  });

  let percent = completedLength / (tasksLength + completedLength) * 100;

  const [completedPercent] = useState(percent.toFixed(1));

  const value: any = useMemo(
    () => ({
      tasks,
      completedPercent,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tasks, completedPercent]
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
