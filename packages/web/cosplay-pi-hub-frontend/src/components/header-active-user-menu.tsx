import {
  Avatar,
  Dropdown,
  Navbar,
} from "@nextui-org/react";

import { useActiveUserDefinedContext } from "../contexts/active-user-context";

export function HeaderActiveUserMenu() {

  const { signOutActiveUser } = useActiveUserDefinedContext();

  return (
    <Dropdown
      placement={`bottom-right`}
    >
      <Navbar.Item>
        <Dropdown.Trigger>
          <Avatar
            bordered
            as="button"
            color={`primary`}
            size="md"
            src="https://cdn.vrcmods.com/uploads/items/item/10197/imgs/11fd2ad0fabf4f5bb109c4494c41c2de.png"
          />
        </Dropdown.Trigger>
      </Navbar.Item>
      <Dropdown.Menu
        onAction={async (dropdownAction) => {

          if (dropdownAction === `sign-out`) {

            await signOutActiveUser();
          }
        }}
      >
        <Dropdown.Item
          key={`profile`}
        >
          Profile
        </Dropdown.Item>
        <Dropdown.Item
          key={`sign-out`}
          withDivider
          color={`error`}
        >
          Sign Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
