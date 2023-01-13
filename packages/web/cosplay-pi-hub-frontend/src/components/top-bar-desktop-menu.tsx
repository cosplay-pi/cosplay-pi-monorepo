import { Stack } from "@chakra-ui/react";

import { TopBarDesktopMenuMainItem } from "./top-bar-desktop-menu-main-item";
import { TopBarMenuConfig } from "./top-bar-menu-config";

export function TopBarDesktopMenu({
  config,
}: {
  config: TopBarMenuConfig;
}) {

  return (
    <Stack direction={`row`} alignItems={`center`} spacing={4}>
      {
        config.mainItems.map((mainItemConfig) => (
          <TopBarDesktopMenuMainItem
            key={mainItemConfig.labelText}
            config={mainItemConfig}
          />
        ))
      }
    </Stack>
  );
}
