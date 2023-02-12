import { Outlet } from "react-router-dom";

import { useActiveUserInfo } from "../hooks/use-active-user-info";

import { SignInPageContent } from "./sign-in-page-content";

export function RequireActiveUserPageProxy() {

  const { activeUserInfo } = useActiveUserInfo();

  if (activeUserInfo === undefined) {

    return <SignInPageContent />;
  }

  return <Outlet />;
}
