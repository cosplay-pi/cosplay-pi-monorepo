import { DeviceCommandType } from "./device-command-type";

export interface DeviceSetRuntimeModuleOverrideSettingsPayload {
  type: DeviceCommandType.SetRuntimeModuleOverrideSettings;
  deviceRuntimeModuleName: string;
  deviceRuntimeModuleOverrideSettings: unknown;
};
