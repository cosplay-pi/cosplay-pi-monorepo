import {
  Collapse,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { CgChevronDown } from "react-icons/cg";

import { TopBarMenuMainItemConfig } from "./top-bar-menu-main-item-config";
import { TopBarMobileMenuSubItem } from "./top-bar-mobile-menu-sub-item";

export function TopBarMobileMenuMainItem({
  config,
}: {
  config: TopBarMenuMainItemConfig;
}) {

  const subMenuState = useDisclosure();

  return (
    <Stack
      spacing={4}
      onClick={
        config.subItems === undefined
          ? undefined
          : subMenuState.onToggle
      }
    >
      <Flex
        py={2}
        as={Link}
        onClick={config.onClick}
        justify={`space-between`}
        align={`center`}
        _hover={{
          textDecoration: `none`,
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue(`gray.600`, `gray.200`)}
        >
          {config.labelText}
        </Text>
        {
          config.subItems === undefined
            ? undefined
            : (
              <Icon
                as={CgChevronDown}
                transition={`all .25s ease-in-out`}
                transform={subMenuState.isOpen ? `rotate(180deg)` : ``}
                w={6}
                h={6}
              />
            )
        }
      </Flex>
      <Collapse
        in={subMenuState.isOpen}
        animateOpacity
        style={{ marginTop: `0!important` }}
      >
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={`solid`}
          borderColor={useColorModeValue(`gray.200`, `gray.700`)}
          align={`start`}
        >
          {
            config.subItems === undefined
              ? undefined
              : config.subItems.map((subItemConfig) => (
                <TopBarMobileMenuSubItem
                  key={subItemConfig.labelText}
                  config={subItemConfig}
                />
              ))
          }
        </Stack>
      </Collapse>
    </Stack>
  );
};
