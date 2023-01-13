import {
  Box,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { CgChevronRight } from "react-icons/cg";

import { TopBarMenuSubItemConfig } from "./top-bar-menu-sub-item-config";

export function TopBarDesktopMenuSubItem({
  config,
}: {
  config: TopBarMenuSubItemConfig;
}) {

  return (
    <Link
      role={`group`}
      display={`block`}
      p={2}
      rounded={`md`}
      _hover={{ bg: useColorModeValue(`pink.50`, `gray.900`) }}
      onClick={config.onClick}
    >
      <Stack direction={`row`} align={`center`}>
        <Box>
          <Text
            transition={`all .3s ease`}
            _groupHover={{ color: `pink.400` }}
            fontWeight={500}
          >
            {config.labelText}
          </Text>
          <Text fontSize={`sm`}>{config.subLabelText}</Text>
        </Box>
        <Flex
          transition={`all .3s ease`}
          transform={`translateX(-10px)`}
          opacity={0}
          _groupHover={{ opacity: `100%`, transform: `translateX(0)` }}
          justify={`flex-end`}
          align={`center`}
          flex={1}
        >
          <Icon color={`pink.400`} w={5} h={5} as={CgChevronRight} />
        </Flex>
      </Stack>
    </Link>
  );
};
