import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { HomePageContent } from "./components/home-page-content";
import { RegisterActiveUserDevicePageContent } from "./components/register-active-user-device-page-content";
import { RootPage } from "./components/root-page";
import { SignInPageContent } from "./components/sign-in-page-content";
import { TestPage } from "./components/test-page";
import { WrongPage } from "./components/wrong-page";

export function App() {

  const router = createBrowserRouter([
    {
      path: `/`,
      element: <RootPage />,
      errorElement: <WrongPage />,
      children: [
        {
          path: ``,
          element: <HomePageContent />,
        },
        {
          path: `sign-in`,
          element: <SignInPageContent />,
        },
        {
          path: `test`,
          element: <TestPage />,
        },
        {
          path: `register-active-user-device`,
          element: <RegisterActiveUserDevicePageContent />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
