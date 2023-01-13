import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { RootPage } from "./components/root-page";
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
          element: <TestPage />,
        },
        {
          path: `login`,
          element: <div>Login</div>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
