import { useNavigate } from "react-router-dom";

import { useActiveUserInfo } from "./use-active-user-info";

export function useNavigateToHomePageIfActiveUserExistsEffect() {

  const { activeUserInfo } = useActiveUserInfo();
  const navigate = useNavigate();

  if (activeUserInfo !== undefined) {

    navigate(`/`);
  }

  return { activeUserInfo };
}
