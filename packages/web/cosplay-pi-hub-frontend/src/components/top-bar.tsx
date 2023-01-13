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
import { useNavigate } from 'react-router-dom';

import { TopBarDesktopMenu } from './top-bar-desktop-menu';
import { TopBarMenuConfig } from './top-bar-menu-config';
import { TopBarMobileMenu } from './top-bar-mobile-menu';

export default function TopBar() {

  const navigate = useNavigate();

  const mobileMenuState = useDisclosure();

  const menuConfig: TopBarMenuConfig = {
    mainItems: [
      {
        labelText: `Home`,
        onClick: () => { navigate(`/`); },
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
      {
        labelText: `Test`,
        onClick: () => { navigate(`/test`); },
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
          <IconButton
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
        </Flex>
        <Flex
          justify={{
            base: `center`,
            md: `start`,
          }}
        >
          <IconButton
            icon={(
              <Icon
                as={CgSmartphoneChip}
                boxSize={6}
                color={useColorModeValue(`gray.800`, `white`)}
              />
            )}
            size={`xs`}
            aria-label={`Cosplay Pi Hub`}
            variant={`unstyled`}
            onClick={() => { navigate(`/`); }}
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
        <Flex
          flex={1}
          justify={`end`}
        >
          <Button
            fontSize={`sm`}
            fontWeight={600}
            color={`white`}
            bg={`pink.400`}
            _hover={{
              bg: `pink.300`,
            }}
            onClick={() => { navigate(`/sign-in`); }}
          >
            Sign In
          </Button>
        </Flex>
      </Flex>
      <Collapse in={mobileMenuState.isOpen} animateOpacity>
        <TopBarMobileMenu config={menuConfig} />
      </Collapse>
    </Box>
  );
}
