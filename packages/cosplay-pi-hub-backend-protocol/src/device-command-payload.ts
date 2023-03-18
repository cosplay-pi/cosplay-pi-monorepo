import { DeviceAddRuntimeModuleCommandPayload } from "./device-add-runtime-module-command-payload";
import { DeviceRemoveRuntimeModuleCommandPayload } from "./device-remove-runtime-module-command-payload";
import { DeviceSetRuntimeModuleOverrideSettingsPayload } from "./device-set-runtime-module-override-settings-command-payload";
import { DeviceStartRuntimeCommandPayload } from "./device-start-runtime-command-payload";
import { DeviceStopRuntimeCommandPayload } from "./device-stop-runtime-command-payload";

export type DeviceCommandPayload = (
  | DeviceAddRuntimeModuleCommandPayload
  | DeviceRemoveRuntimeModuleCommandPayload
  | DeviceSetRuntimeModuleOverrideSettingsPayload
  | DeviceStartRuntimeCommandPayload
  | DeviceStopRuntimeCommandPayload
);
