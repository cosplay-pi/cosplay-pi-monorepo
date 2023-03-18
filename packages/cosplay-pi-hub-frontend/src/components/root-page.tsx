import { Outlet } from "react-router-dom";

import { Box } from "./box";
import { Footer } from "./footer";
import { Header } from "./header";

export function RootPage() {

  return (
    <Box
      css={{
        width: `100%`,
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `flex-start`,
        gap: `$md`,
      }}
    >
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
}
