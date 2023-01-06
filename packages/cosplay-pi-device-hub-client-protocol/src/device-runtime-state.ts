import { DeviceRuntimeModuleState } from "./device-runtime-module-state";

export interface DeviceRuntimeState {
  process?: {};
  modules: {
    [moduleName: string]: DeviceRuntimeModuleState;
  };
};
