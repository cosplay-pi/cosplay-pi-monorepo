import { DeviceCommandType } from "./device-command-type";

export interface DeviceAddRuntimeModuleCommandPayload {
  type: DeviceCommandType.AddRuntimeModuleCommand;
  deviceRuntimeModuleName: string;
  deviceRuntimeModuleVersionRange: string;
};
