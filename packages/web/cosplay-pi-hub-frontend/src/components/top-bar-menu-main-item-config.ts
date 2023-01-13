import { TopBarMenuItemConfig } from "./top-bar-menu-item-config";
import { TopBarMenuSubItemConfig } from "./top-bar-menu-sub-item-config";

export interface TopBarMenuMainItemConfig extends TopBarMenuItemConfig {
  subItems?: Array<TopBarMenuSubItemConfig>;
}
