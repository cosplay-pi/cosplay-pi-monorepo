import {
  Box,
  Stack,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import TopBar from "./top-bar";

export function RootPage() {

  return (
    <Stack
      w={`100vw`}
      h={`100vh`}
      spacing={0}
      direction={`column`}
    >
      <TopBar />
      <Box
        flex={1}
        overflowY={`auto`}
      >
        <Outlet />
      </Box>
    </Stack>
  );
}
