import { DeviceCommandInfo } from "./device-command-info";
import { DeviceCommandType } from "./device-command-type";

export interface DeviceStopRuntimeCommandInfo extends DeviceCommandInfo {
  type: DeviceCommandType.StopRuntimeCommand;
};
