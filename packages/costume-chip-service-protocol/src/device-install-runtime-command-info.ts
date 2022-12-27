import { DeviceCommandInfo } from "./device-command-info";
import { DeviceCommandType } from "./device-command-type";
import { DeviceRuntimeConfig } from "./device-runtime-config";

export interface DeviceInstallRuntimeCommandInfo extends DeviceCommandInfo {
  type: DeviceCommandType.InstallRuntimeCommand;
  deviceRuntimeConfig: DeviceRuntimeConfig;
};
