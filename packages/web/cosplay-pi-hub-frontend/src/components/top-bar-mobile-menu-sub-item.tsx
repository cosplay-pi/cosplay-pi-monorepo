import { Link } from "@chakra-ui/react";

import { TopBarMenuSubItemConfig } from "./top-bar-menu-sub-item-config";

export function TopBarMobileMenuSubItem({
  config,
}: {
  config: TopBarMenuSubItemConfig;
}) {

  return (
    <Link
      py={2}
      onClick={config.onClick}
    >
      {config.labelText}
    </Link>
  );
};
