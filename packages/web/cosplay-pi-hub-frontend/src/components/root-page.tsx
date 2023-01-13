import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import TopBar from "./top-bar";

export function RootPage() {

  return (
    <Box>
      <TopBar />
      <Outlet />
    </Box>
  );
}
