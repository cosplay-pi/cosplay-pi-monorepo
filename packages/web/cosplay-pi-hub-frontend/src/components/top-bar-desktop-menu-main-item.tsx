import {
  Box,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

import { TopBarDesktopMenuSubItem } from "./top-bar-desktop-menu-sub-item";
import { TopBarMenuMainItemConfig } from "./top-bar-menu-main-item-config";

export function TopBarDesktopMenuMainItem({
  config,
}: {
  config: TopBarMenuMainItemConfig;
}) {

  return (
    <Box>
      <Popover trigger={`hover`} placement={`bottom-start`}>
        <PopoverTrigger>
          <Link
            p={2}
            fontSize={`sm`}
            fontWeight={500}
            color={useColorModeValue(`gray.600`, `gray.200`)}
            _hover={{
              textDecoration: `none`,
              color: useColorModeValue(`gray.800`, `white`),
            }}
            onClick={config.onClick}
          >
            {config.labelText}
          </Link>
        </PopoverTrigger>
        {
          config.subItems === undefined
            ? undefined
            : (
              <PopoverContent
                border={0}
                boxShadow={`xl`}
                bg={useColorModeValue(`white`, `gray.800`)}
                p={4}
                rounded={`xl`}
                minW={`sm`}
              >
                <Stack>
                  {
                    config.subItems.map((subItemConfig) => (
                      <TopBarDesktopMenuSubItem
                        key={subItemConfig.labelText}
                        config={subItemConfig}
                      />
                    ))
                  }
                </Stack>
              </PopoverContent>
            )
        }
      </Popover>
    </Box>
  );
};
