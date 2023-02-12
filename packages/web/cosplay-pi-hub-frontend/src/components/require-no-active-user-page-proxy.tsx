import { useEffect } from "react";
import {
  Outlet,
  useNavigate,
} from "react-router-dom";

import { useActiveUserInfo } from "../hooks/use-active-user-info";

export function RequireNoActiveUserPageProxy() {

  const navigate = useNavigate();

  const { activeUserInfo } = useActiveUserInfo();

  useEffect(
    () => {

      if (activeUserInfo !== undefined) {

        navigate(`/`);
      }
    },
    [
      activeUserInfo,
    ],
  );

  if (activeUserInfo !== undefined) {

    return null;
  }

  return <Outlet />;
}
