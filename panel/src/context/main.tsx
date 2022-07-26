import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

type MainContextType = {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  userInfos: {
    avatar: string,
    username: string,
    role: string,
  },
  setUserInfos: Dispatch<SetStateAction<{
    avatar: string,
    username: string,
    role: string
  }>>;
  navbarOpen: boolean;
  setNavbarOpen: Dispatch<SetStateAction<boolean>>;
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  homeCards: {
    width: number;
    background: string;
    icon: string;
    title: string;
  }[];
};

export const MainContext = createContext<MainContextType>({
  isLogin: false as any,
  setIsLogin: () => null,
  userInfos: {
    avatar: "https://cdn.discordapp.com/attachments/584738120738537483/990766575965597746/Group_2_2.png",
    username: 'Guest',
    role: 'unkown',
  },
  setUserInfos: () => null,
  navbarOpen: false as any,
  setNavbarOpen: () => null,
  sidebarOpen: false as any,
  setSidebarOpen: () => null,
  homeCards: [],
});

type MainProviderProps = {
  children: ReactNode;
};

export const MainProvider: FC<MainProviderProps> = (props) => {
  const { children } = props;

  const location = useLocation();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [userInfos, setUserInfos] = useState({
    avatar: "https://cdn.discordapp.com/attachments/584738120738537483/990766575965597746/Group_2_2.png",
    username: 'Guest',
    role: 'unkown',
  });

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [homeCards] = useState([
    {
      width: 1,
      background: "#f0476f",
      icon: "lightBulb",
      title: "R&D for New Banking Mobile App",
    },
    {
      width: 2,
      background: "#ac98ef",
      icon: "key",
      title: "Create Signup Page",
    },
  ]);

  useEffect(() => {
    if (!isLogin && location.pathname !== "/login") {
      navigate("/login");
    } else if (isLogin && location.pathname === "/login") {
      navigate("/");
    }
  }, [location, isLogin, navigate]);

  const value: any = useMemo(
    () => ({
      isLogin,
      setIsLogin,
      userInfos,
      navbarOpen,
      setUserInfos,
      setNavbarOpen,
      sidebarOpen,
      setSidebarOpen,
      homeCards,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLogin, userInfos, navbarOpen, sidebarOpen, homeCards]
  );

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};
