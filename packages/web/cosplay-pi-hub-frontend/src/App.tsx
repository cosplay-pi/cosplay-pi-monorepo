import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { AboutPageContent } from "./components/about-page-content";
import { ActiveUserDevicesPageContent } from "./components/active-user-devices-page-content";
import { HomePageContent } from "./components/home-page-content";
import { InvalidPage } from "./components/invalid-page";
import { LoadingPage } from "./components/loading-page";
import { RegisterActiveUserDevicePageContent } from "./components/register-active-user-device-page-content";
import { RequireActiveUserPageProxy } from "./components/require-active-user-page-proxy";
import { RequireNoActiveUserPageProxy } from "./components/require-no-active-user-page-proxy";
import { RootPage } from "./components/root-page";
import { SignInPageContent } from "./components/sign-in-page-content";
import { useActiveUserContext } from "./contexts/active-user-context";

const router = createBrowserRouter([
  {
    path: `/`,
    element: <RootPage />,
    errorElement: <InvalidPage />,
    children: [
      {
        path: ``,
        element: <HomePageContent />,
      },
      {
        element: <RequireActiveUserPageProxy />,
        children: [
          {
            path: `my-devices`,
            element: <ActiveUserDevicesPageContent />,
          },
          {
            path: `my-devices/register`,
            element: <RegisterActiveUserDevicePageContent />,
          },
        ],
      },
      {
        element: <RequireNoActiveUserPageProxy />,
        children: [
          {
            path: `sign-in`,
            element: <SignInPageContent />,
          },
        ],
      },
      {
        path: `about`,
        element: <AboutPageContent />,
      },
    ],
  },
]);

export function App() {

  const activeUserContextValue = useActiveUserContext();

  if (activeUserContextValue === undefined) {

    return <LoadingPage />;
  }

  return <RouterProvider router={router} />;
}
