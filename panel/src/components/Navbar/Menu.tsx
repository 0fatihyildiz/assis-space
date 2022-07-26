import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useNavigation from "../../hooks/useNavigation";
import useMain from "../../hooks/useMain";
import { useLocation } from "react-router-dom";

import MenuItem from "./MenuItem";

export default function Menu() {
  const { navItems } = useNavigation();
  const { setNavbarOpen } = useMain();

  const navigate = useNavigate();
  const location = useLocation();

  const goto = useCallback(
    (id: string, route: string) => {
      setNavbarOpen(false);
      navigate(route);
      // eslint-disable-next-line
    },
    [navigate, setNavbarOpen]
  );

  return (
    <div className="mt-2">
      <div className="text-slate-700 text-xs font-semibold pl-6 mb-1"> Menu </div>
      {
        // @ts-ignore
        navItems.map((item) => (
          <div
            className="flex flex-row"
            key={item.id}
            onClick={() => goto(item.id, item.route)}
          >
            <MenuItem item={item} active={location.pathname === item.route} />
          </div>
        ))
      }
    </div>
  );
}
