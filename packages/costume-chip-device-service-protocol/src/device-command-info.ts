import { DeviceInstallRuntimeCommandPayload } from "./device-install-runtime-command-payload";
import { DeviceStartRuntimeCommandPayload } from "./device-start-runtime-command-payload";
import { DeviceStopRuntimeCommandPayload } from "./device-stop-runtime-command-payload";
import { DeviceUpdateRuntimeModuleSettingsCommandPayload } from "./device-update-module-settings-command-payload";

export interface DeviceCommandInfo {
  id: string;
  payload: (
    | DeviceInstallRuntimeCommandPayload 
    | DeviceStartRuntimeCommandPayload 
    | DeviceStopRuntimeCommandPayload 
    | DeviceUpdateRuntimeModuleSettingsCommandPayload 
  );
};
