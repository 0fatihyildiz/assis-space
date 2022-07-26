import {
  createContext,
  FC,
  ReactNode,
  useMemo,
  useState,
} from "react";

type NavigationContextType = {
  navItems: (
    | {
        id: string;
        text: string;
        name: string;
        route: string;
        notification?: undefined;
      }
    | {
        id: string;
        text: string;
        name: string;
        route: string;
        notification: number;
      }
  )[];
  favorites: {
    title: string;
  }[];
};

export const NavigationContext = createContext<NavigationContextType>(
  null as any
);

type NavigationProviderProps = {
  children: ReactNode;
};

export const NavigationProvider: FC<NavigationProviderProps> = (props) => {
  const { children } = props;
  
  const [navItems] = useState([
    { id: "navID-1", text: "Dashboard", name: "dashboard", route: "/" },
    { id: "navID-2", text: "Questions", name: "questions", route: "/questions" },
    { id: "navID-3", text: "Lessons", name: "lessons", route: "/lessons" },
    { id: "navID-4", text: "Users", name: "users", route: "/users" },
  ]);
  const [favorites] = useState([
    { title: "Rust", color: "#6a9bf6" },
    { title: "Typescript", color: "#f89a99" },
    { title: "React", color: "#60d0c4" },
  ]);

  const value: any = useMemo(
    () => ({
      navItems,
      favorites,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navItems]
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};
