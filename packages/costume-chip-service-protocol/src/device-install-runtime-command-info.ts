import { DeviceCommandInfo } from "./device-command-info";
import { DeviceCommandType } from "./device-command-type";
import { RuntimeConfig } from "./runtime-config";

export interface DeviceInstallRuntimeCommandInfo extends DeviceCommandInfo {
  type: DeviceCommandType.InstallRuntime;
  runtimeConfig: RuntimeConfig;
};
