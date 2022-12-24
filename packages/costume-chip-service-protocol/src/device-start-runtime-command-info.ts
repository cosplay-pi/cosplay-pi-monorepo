import { DeviceCommandInfo } from "./device-command-info";
import { DeviceCommandType } from "./device-command-type";

export interface DeviceStartRuntimeCommandInfo extends DeviceCommandInfo {
  type: DeviceCommandType.StartRuntime;
};
