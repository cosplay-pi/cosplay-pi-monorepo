import {
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  useAuthState,
  useSignOut,
} from "react-firebase-hooks/auth";

import { useFirebaseAuth } from "./hooks/use-firebase-auth";
import { TopBarSignInButton } from "./top-bar-sign-in-button";

export function TopBarUserMenu() {

  const firebaseAuth = useFirebaseAuth();

  const [firebaseUser] = useAuthState(firebaseAuth);

  const [signOut] = useSignOut(firebaseAuth);

  if (firebaseUser === undefined || firebaseUser === null) {

    return <TopBarSignInButton />;
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
          <MenuItem>Account settings</MenuItem>
          <MenuDivider />
          <MenuItem
            onClick={() => signOut()}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
