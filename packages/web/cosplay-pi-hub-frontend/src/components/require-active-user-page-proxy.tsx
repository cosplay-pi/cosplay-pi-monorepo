import { Outlet } from "react-router-dom";

import { useActiveUserDefinedContext } from "../contexts/active-user-context";

import { SignInPageContent } from "./sign-in-page-content";

export function RequireActiveUserPageProxy() {

  const { activeUserInfo } = useActiveUserDefinedContext();

  if (activeUserInfo === undefined) {

    return <SignInPageContent />;
  }

  return <Outlet />;
}
