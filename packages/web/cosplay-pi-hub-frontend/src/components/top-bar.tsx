import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  CgClose,
  CgMenu,
  CgSmartphoneChip,
} from "react-icons/cg";

import { TopBarDesktopMenu } from './top-bar-desktop-menu';
import { TopBarMenuConfig } from './top-bar-menu-config';
import { TopBarMobileMenu } from './top-bar-mobile-menu';

export default function TopBar() {
  const mobileMenuState = useDisclosure();

  const menuConfig: TopBarMenuConfig = {
    mainItems: [
      {
        labelText: `Home`,
      },
      {
        labelText: `Devices`,
        subItems: [
          {
            labelText: `My Devices`,
            subLabelText: `View and manage your devices`,
          },
          {
            labelText: `Add Device`,
            subLabelText: `Add a new device`,
          },
        ],
      },
    ],
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue(`white`, `gray.800`)}
        color={useColorModeValue(`gray.600`, `white`)}
        minH={`60px`}
        py={2}
        px={4}
        borderBottom={1}
        borderStyle={`solid`}
        borderColor={useColorModeValue(`gray.200`, `gray.900`)}
        align={`center`}
      >
        <IconButton
          display={{
            base: `flex`,
            md: `none`,
          }}
          ml={-2}
          onClick={mobileMenuState.onToggle}
          icon={
            mobileMenuState.isOpen
              ? <Icon as={CgClose} boxSize={3} />
              : <Icon as={CgMenu} boxSize={5} />
          }
          variant={`ghost`}
          aria-label={`Toggle Menu`}
        />
        <Flex
          flex={1}
          justify={{
            base: `center`,
            md: `start`,
          }}
        >
          <Icon
            as={CgSmartphoneChip}
            boxSize={6}
            color={useColorModeValue(`gray.800`, `white`)}
          />
          <Flex
            display={{
              base: `none`,
              md: `flex`,
            }}
            ml={10}
          >
            <TopBarDesktopMenu config={menuConfig} />
          </Flex>
        </Flex>
        <Button
          fontSize={`sm`}
          fontWeight={600}
          color={`white`}
          bg={`pink.400`}
          _hover={{
            bg: `pink.300`,
          }}
        >
          Sign In
        </Button>
      </Flex>
      <Collapse in={mobileMenuState.isOpen} animateOpacity>
        <TopBarMobileMenu config={menuConfig} />
      </Collapse>
    </Box>
  );
}
