import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useActiveUserInfo } from "./use-active-user-info";

export function useNavigateToHomePageIfActiveUserExistsEffect() {

  const navigate = useNavigate();

  const { activeUserInfo } = useActiveUserInfo();

  useEffect(
    () => {

      if (activeUserInfo !== undefined) {

        navigate(`/`);
      }
    },
    [activeUserInfo],
  );

  return { activeUserInfo };
}
