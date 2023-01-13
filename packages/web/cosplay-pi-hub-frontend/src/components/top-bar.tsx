import {
  Box,
  Flex,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { TopBarActiveUserMenu } from './top-bar-active-user-menu';
import { TopBarDesktopMenu } from './top-bar-desktop-menu';
import { TopBarLogoButton } from './top-bar-logo-button';
import { TopBarMenuConfig } from './top-bar-menu-config';
import { TopBarMobileMenu } from './top-bar-mobile-menu';
import { TopBarMobileMenuToggle } from './top-bar-mobile-menu-toggle';

export default function TopBar() {

  const navigate = useNavigate();

  const mobileMenuDisclosure = useDisclosure();

  const menuConfig: TopBarMenuConfig = {
    mainItems: [
      {
        labelText: `Home`,
        onClick: () => navigate(`/`),
      },
      {
        labelText: `Devices`,
        subItems: [
          {
            labelText: `My Devices`,
            subLabelText: `View and manage your devices`,
            onClick: () => navigate(`/user-devices`),
          },
          {
            labelText: `Add Device`,
            subLabelText: `Add a new device`,
          },
        ],
      },
      {
        labelText: `Test`,
        onClick: () => navigate(`/test`),
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
        <Flex
          display={{
            base: `flex`,
            md: `none`,
          }}
          flex={1}
          justify={`start`}
        >
          <TopBarMobileMenuToggle
            mobileMenuDisclosure={mobileMenuDisclosure}
          />
        </Flex>
        <Flex
          justify={{
            base: `center`,
            md: `start`,
          }}
        >
          <TopBarLogoButton />
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
        <Flex
          flex={1}
          justify={`end`}
        >
          <TopBarActiveUserMenu />
        </Flex>
      </Flex>
      <TopBarMobileMenu
        config={menuConfig}
        isOpen={mobileMenuDisclosure.isOpen}
      />
    </Box>
  );
}
