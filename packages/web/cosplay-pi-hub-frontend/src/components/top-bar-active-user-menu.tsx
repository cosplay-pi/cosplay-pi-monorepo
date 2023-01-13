import {
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { useActiveUserInfo } from "./hooks/use-active-user-info";
import { useSignOutActiveUser } from "./hooks/use-sign-out-active-user";
import { TopBarActiveUserMenuSignInButton } from "./top-bar-active-user-menu-sign-in-button";

export function TopBarActiveUserMenu() {

  const { activeUserInfo } = useActiveUserInfo();
  const { signOutActiveUser } = useSignOutActiveUser();

  const signOutModalDisclosure = useDisclosure();

  if (activeUserInfo === undefined) {

    return <TopBarActiveUserMenuSignInButton />;
  }

  return (
    <Flex alignItems={`center`}>
      <Menu>
        <MenuButton
          as={Button}
          rounded={`full`}
          variant={`link`}
          cursor={`pointer`}
          minW={0}
        >
          <Avatar
            size={`sm`}
            src={
              `https://cdn.vrcmods.com/uploads/items/item/10197/imgs/11fd2ad0fabf4f5bb109c4494c41c2de.png`
            }
          />
        </MenuButton>
        <MenuList>
          <MenuItem>
            Account settings
          </MenuItem>
          <MenuDivider />
          <MenuItem
            onClick={() => signOutModalDisclosure.onOpen()}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
      <Modal
        isOpen={signOutModalDisclosure.isOpen}
        onClose={signOutModalDisclosure.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure you want to sign out?</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button
              colorScheme={`red`}
              mr={3}
              onClick={() => {

                signOutActiveUser();
                signOutModalDisclosure.onClose();
              }}
            >
              Sign Out
            </Button>
            <Button variant='ghost'
              onClick={signOutModalDisclosure.onClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
