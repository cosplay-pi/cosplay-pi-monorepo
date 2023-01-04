import { DeviceCommandType } from "./device-command-type";

export interface DeviceUpdateRuntimeModuleSettingsCommandPayload {
  type: DeviceCommandType.UpdateRuntimeModuleSettingsCommand;
  deviceRuntimeModuleName: string;
  deviceRuntimeModuleSettings: unknown;
};
