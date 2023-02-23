import { useEffect } from "react";
import {
  Outlet,
  useNavigate,
} from "react-router-dom";

import { useActiveUserDefinedContext } from "../contexts/active-user-context";

export function RequireNoActiveUserPageProxy() {

  const navigate = useNavigate();

  const { activeUserInfo } = useActiveUserDefinedContext();

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
