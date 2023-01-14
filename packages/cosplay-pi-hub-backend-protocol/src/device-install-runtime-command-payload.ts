import { DeviceCommandType } from "./device-command-type";
import { DeviceRuntimeConfig } from "./device-runtime-config";

export interface DeviceInstallRuntimeCommandPayload {
  type: DeviceCommandType.InstallRuntimeCommand;
  deviceRuntimeConfig: DeviceRuntimeConfig;
};
