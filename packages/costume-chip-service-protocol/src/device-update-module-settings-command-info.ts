import { DeviceCommandInfo } from "./device-command-info";
import { DeviceCommandType } from "./device-command-type";

export interface DeviceUpdateModuleSettingsCommandInfo extends DeviceCommandInfo {
  type: DeviceCommandType.UpdateModuleSettings;
  moduleName: string;
  moduleSettings: unknown;
};
