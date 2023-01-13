import {
  Collapse,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

import { TopBarMenuConfig } from "./top-bar-menu-config";
import { TopBarMobileMenuMainItem } from "./top-bar-mobile-menu-main-item";

export function TopBarMobileMenu({
  isOpen,
  config,
}: {
  isOpen: boolean;
  config: TopBarMenuConfig;
}) {

  return (
    <Collapse animateOpacity in={isOpen}>
      <Stack
        bg={useColorModeValue(`white`, `gray.800`)}
        p={4}
        display={{ md: `none` }}
      >
        {
          config.mainItems.map((mainItemConfig) => (
            <TopBarMobileMenuMainItem
              key={mainItemConfig.labelText}
              config={mainItemConfig}
            />
          ))
        }
      </Stack>
    </Collapse>
  );
}
