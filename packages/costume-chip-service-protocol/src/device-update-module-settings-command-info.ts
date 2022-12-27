import { DeviceCommandInfo } from "./device-command-info";
import { DeviceCommandType } from "./device-command-type";

export interface DeviceUpdateRuntimeModuleSettingsCommandInfo extends DeviceCommandInfo {
  type: DeviceCommandType.UpdateRuntimeModuleSettingsCommand;
  deviceRuntimeModuleName: string;
  deviceRuntimeModuleSettings: unknown;
};
