import { createContext, FC, ReactNode, useMemo, useState } from "react";

type SnapshotsContextType = {
  snapshots: {
    activeSnapshots: {
      [key: string]: {
        logo: string,
        title: string,
        description: string
      }[]
    },
    lastCompletedLessons: {
      [key: string]: {
        logo: string,
        title: string,
        description: string
      }[]
    }
  };
  completedPercent: number;
};

export const SnapshotsContext = createContext<SnapshotsContextType>({
  snapshots: {
    activeSnapshots: {
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
    lastCompletedLessons: {
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

type SnapshotsProviderProps = {
  children: ReactNode;
};

export const SnapshotsProvider: FC<SnapshotsProviderProps> = (props) => {
  const { children } = props;

  const [snapshots] = useState({
    activeSnapshots: {
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
    lastCompletedLessons: {
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

  let snapshotsLength: number = 0;
  let completedLength: number = 0;

  let activeSnapshotsKeys = Object.keys(snapshots.activeSnapshots);
  let lastCompletedLessonsKeys = Object.keys(snapshots.lastCompletedLessons);

  activeSnapshotsKeys.forEach((key) => { 
    // @ts-ignore
    snapshotsLength += snapshots.activeSnapshots[key].length
  });

  lastCompletedLessonsKeys.forEach((key) => {
    // @ts-ignore
    completedLength += snapshots.lastCompletedLessons[key].length
  });

  let percent = completedLength / (snapshotsLength + completedLength) * 100;

  const [completedPercent] = useState(percent.toFixed(1));

  const value: any = useMemo(
    () => ({
      snapshots,
      completedPercent,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [snapshots, completedPercent]
  );

  return (
    <SnapshotsContext.Provider value={value}>{children}</SnapshotsContext.Provider>
  );
};
