import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";

type SidebarContextType = {
  
};

export const SidebarContext = createContext<SidebarContextType>({});

type SidebarProviderProps = {
  children: ReactNode;
};

export const SidebarProvider: FC<SidebarProviderProps> = (props) => {
  const { children } = props;

  const value: any = useMemo(
    () => ({}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
