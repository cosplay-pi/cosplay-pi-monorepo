import { DeviceCommandType } from "./device-command-type";

export interface DeviceRemoveRuntimeModuleCommandPayload {
  type: DeviceCommandType.RemoveRuntimeModuleCommand;
  deviceRuntimeModuleName: string;
};
